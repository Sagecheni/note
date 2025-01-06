---
date: 2025-01-06
--- 


![16 Virtual Machine VM如何在高权限工作](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20VM%E5%A6%82%E4%BD%95%E5%9C%A8%E9%AB%98%E6%9D%83%E9%99%90%E5%B7%A5%E4%BD%9C.png)

这页PPT解释了虚拟机在高层次上的工作原理：

1. VMM（虚拟机监视器）的特权运行机制：
   - VMM本身运行在最高特权级别
   - 虚拟机中的操作系统运行在较低的特权级别（类似用户级别）
   - VMM负责在多个虚拟机之间复用资源

2. 操作系统代码在VM中的运行方式：
   - 目标是让操作系统代码直接在CPU上运行
   - 需要将操作系统当作用户级进程来对待
   - 需要考虑哪些操作系统代码可以直接运行，哪些会造成问题
   - 对于不能直接运行的代码，需要通过模拟来实现

3. 理想的特权指令处理机制（trap-and-emulate）：
   - 特权指令会触发异常，将控制权转交给VMM
   - VMM模拟这些特权操作并返回结果
   - 非特权指令的执行是透明的，无需修改
   - 这种机制被称为"陷阱和模拟"（trap-and-emulate）


![16 Virtual Machine VMMtypes](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20VMMtypes.png)
1. Type-1 Hypervisor（I型虚拟机监视器）：
- 也称为裸机虚拟化（bare-metal）或原生虚拟化（native）
- 直接运行在硬件之上，不需要宿主操作系统
- 主要代表产品：
  * Xen（现在属于Citrix）
  * VMware vSphere（包含ESX/ESXi）
  * KVM（基于内核的虚拟机）
  * Microsoft Hyper-V
  * Oracle VM
- 特点：性能更好，更安全，主要用于服务器虚拟化

2. Type-2 Hypervisor（II型虚拟机监视器）：
- 也称为托管型虚拟机监视器（hosted hypervisors）
- 运行在常规操作系统之上（如Windows、Linux、macOS）
- 主要代表产品：
  * Oracle VirtualBox
  * VMware Workstation
  * Windows Virtual PC
  * Parallels Desktop
- 特点：更适合桌面使用，安装配置更简单，但性能较Type-1差

从图中可以看到关键区别：
- Type-1直接在物理硬件上运行，虚拟机运行在hypervisor之上
- Type-2需要先有一个宿主操作系统，然后虚拟机运行在hypervisor和宿主系统之上

![16 Virtual Machine 不同类型的虚拟系统优势](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E4%B8%8D%E5%90%8C%E7%B1%BB%E5%9E%8B%E7%9A%84%E8%99%9A%E6%8B%9F%E7%B3%BB%E7%BB%9F%E4%BC%98%E5%8A%BF.png)
![16 Virtual Machine ModeTransfer1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20ModeTransfer1.png)
当客户机（Guest）中的用户进程发起系统调用时的处理流程：

1. 当客户机用户进程发起系统调用时：
- 会陷入（trap）到主机内核的系统调用处理程序
- 这是因为特权指令必须由hypervisor处理

2. 主机内核保存状态：
- 保存程序计数器（PC）
- 保存标志寄存器（FLAGS）
- 保存客户机内核的中断栈上的用户栈指针

3. 控制权转移：
- 主机内核将控制权转移给客户机内核
- 客户机内核以用户模式特权级运行

4. 客户机内核处理：
- 执行系统调用
- 保存用户状态
- 检查参数合法性

5. 返回过程：
- 当客户机内核尝试使用iret指令返回到用户进程时
- 会触发处理器异常
- 控制权重新回到主机内核

6. 最终返回：
- 主机内核恢复用户进程的状态
- 使进程在用户级别运行
- 就像客户机操作系统直接返回一样

图的右侧展示了整个系统的层次结构：
- 最上层是客户机用户进程
- 中间是客户机内核层
- 底层是主机内核层
- 最底层是硬件层



![16 Virtual Machine ModeTransfer2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20ModeTransfer2.png)


# CPU虚拟化
![16 Virtual Machine CPU虚拟化](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20CPU%E8%99%9A%E6%8B%9F%E5%8C%96.png)
这张PPT讲述了虚拟机监控器(VMM)如何在CPU上实现虚拟机的多路复用。让我详细解释：

1. VMM的主要任务：
- 需要在物理CPU上运行多个虚拟机（VM）
- 类似于操作系统如何在CPU上运行多个进程

2. 实现方式：
- 使用时间片轮转（Timeslice）机制
- 每个VM获得一个CPU时间片
- 在这个时间片内，VM会运行自己的操作系统和应用程序

3. 调度策略：
- 使用相对简单的调度器
- 主要采用两种方式：
  * 轮询（Round robin）：VM轮流使用CPU
  * 工作量保持（work-conserving）：如果某个VM没用完它的时间片，会把剩余时间给其他VM使用

这种设计类似于操作系统的进程调度，但是在更高的层次上 - VMM管理VM，而VM内部的操作系统再管理自己的进程。

# 虚拟化事件(异常和中断)

![16 Virtual Machine 虚拟化事件](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E8%99%9A%E6%8B%9F%E5%8C%96%E4%BA%8B%E4%BB%B6.png)

1. VMM的事件接收：
- VMM会接收物理硬件产生的中断
- 同时也会接收异常事件
- 这些事件需要被正确地转发到对应的VM中

2. 事件分发需求：
- VMM需要将这些事件准确地转发给对应的VM
- 这个过程叫做"vector to appropriate VM"（向适当的VM进行向量化分发）

3. 不同虚拟化平台的实现方式：

Xen的方案：
- 修改操作系统使用虚拟中断寄存器
- 使用事件队列来管理和分发事件

VMware的方案：
- 构造适当的处理程序调用
- 模拟事件寄存器
- 无需修改客户操作系统

# 虚拟化IO

![16 Virtual Machine 虚拟化IO](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E8%99%9A%E6%8B%9F%E5%8C%96IO.png)
![16 Virtual Machine 虚拟化IO2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E8%99%9A%E6%8B%9F%E5%8C%96IO2.png)
# 虚拟化内存
![16 Virtual Machine 虚拟化内存](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E8%99%9A%E6%8B%9F%E5%8C%96%E5%86%85%E5%AD%98.png)
1. 操作系统对内存的假设：
- 认为自己完全控制所有内存
- 认为可以管理所有内存空间
- 认为可以将任何虚拟页映射到任何物理页

2. VMM的内存管理需求：
- 需要在多个VM之间分配物理内存
- 需要给每个VM分配硬件页面
- 必须控制内存映射以实现隔离：
  * 不能让OS随意映射到任何硬件页
  * OS只能映射VMM分配给它的页面

3. 硬件TLB带来的挑战：
- 当TLB缺失时，硬件会自动遍历内存中的页表
- 这使得VMM难以控制页表访问
- VMM需要额外的机制来控制OS对页表的访问

这实际上展示了内存虚拟化的一个核心矛盾：
- OS认为自己完全控制内存
- 但实际上VMM必须限制OS的内存访问
- 同时还要处理硬件TLB带来的复杂性

![16 Virtual Machine 内存虚拟化2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E5%86%85%E5%AD%98%E8%99%9A%E6%8B%9F%E5%8C%962.png)
Xen的半虚拟化(Paravirtualization)方案中如何处理内存虚拟化。

1. 基本原理：
- Xen直接使用操作系统创建的页表
- 这些页表可以被硬件MMU直接使用
- 不需要额外的内存地址转换层

2. 页表更新机制：
- OS可以直接读取页表，不需要修改
- 但所有对页表项(PTE)的写操作都需要Xen验证
  * 确保虚拟到物理的映射是有效的
  * 验证OS是否真正"拥有"要使用的物理页面
- OS需要修改代码，在更新PTE时通过hypercall调用Xen
- 可以批量处理更新以减少开销

3. 关键特点：
- 页表的工作方式基本保持不变
- 但OS被限制只能映射到它拥有的物理页面
- 这种方式需要修改OS源代码

4. 局限性：
- 只有在可以修改操作系统的情况下才能工作
- 如果无法修改OS（如闭源系统），这种方案就不适用

这种方案的优点是性能好（直接使用硬件MMU），缺点是需要修改操作系统。


![16 Virtual Machine VMM内存的三个抽象层次](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20VMM%E5%86%85%E5%AD%98%E7%9A%84%E4%B8%89%E4%B8%AA%E6%8A%BD%E8%B1%A1%E5%B1%82%E6%AC%A1.png)
![16 Virtual Machine VMM内存的三个抽象形式2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20VMM%E5%86%85%E5%AD%98%E7%9A%84%E4%B8%89%E4%B8%AA%E6%8A%BD%E8%B1%A1%E5%BD%A2%E5%BC%8F2.png)
![16 Virtual Machine VMM的三个抽象层次3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20VMM%E7%9A%84%E4%B8%89%E4%B8%AA%E6%8A%BD%E8%B1%A1%E5%B1%82%E6%AC%A13.png)
在VMM中内存的三个抽象层次。

1. 机器内存(Machine Memory)：
- 实际的硬件内存
- 例如16GB的DRAM
- 这是最底层的物理内存

2. 物理内存(Physical Memory)：
- 由操作系统管理的硬件内存抽象
- 例子：当VMM给VM分配512MB时，OS认为它有512MB连续的物理内存
- 但实际上这512MB在机器内存中可能是不连续的
- 这是一个中间层的抽象

3. 虚拟内存(Virtual Memory)：
- 就是我们熟悉的虚拟地址空间
- 每个进程都有自己的虚拟地址空间

关键点：
- 在VM中，OS可以不做修改地创建和管理自己的页表
- 但这些页表不会被MMU硬件直接使用
- 这是因为需要考虑从虚拟地址到机器内存的映射

这三层抽象帮助我们理解：
- 为什么需要地址转换
- VMM如何欺骗OS让它以为自己在管理实际物理内存
- 实际内存访问如何在这些层之间转换
## Shadow Page Table

![16 Virtual Machine 阴影页表](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E9%98%B4%E5%BD%B1%E9%A1%B5%E8%A1%A8.png)
![16 Virtual Machine 阴影页表2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E9%98%B4%E5%BD%B1%E9%A1%B5%E8%A1%A82.png)
![16 Virtual Machine 阴影页表3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E9%98%B4%E5%BD%B1%E9%A1%B5%E8%A1%A83.png)
Shadow Page Table是VMM中的一种内存虚拟化技术

1. 基本概念：
- VMM创建和管理影子页表，直接将guest虚拟地址映射到host物理地址
- 在上下文切换时将这些页表加载到MMU
- 绕过了guest OS的页表，减少了地址转换层次

2. 工作机制：
- VMM将guest OS的页表映射为只读
- 当guest OS尝试修改页表时，会触发trap到VMM
- VMM会同时更新shadow page table和guest OS的页表
- 这个过程也称为memory tracing

3. 最新硬件支持：
Intel架构添加了对shadow page table的直接支持：
- 硬件可以设置两个页表
- 当guest进程发生TLB miss时，硬件可以直接进行两次转换
- 不需要VMM显式维护shadow page table

4. 优缺点：
优点：
- 简化了VM实现
- guest/host页表切换更快更容易

缺点：
- guest页表更新需要与shadow页表同步
- 导致频繁VM exit
- 有较高的性能开销


![16 Virtual Machine 内存分配](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/16%20Virtual%20Machine%20%E5%86%85%E5%AD%98%E5%88%86%E9%85%8D.png)
这张PPT介绍了VMM中的内存分配策略，让我分析三个主要部分：

1. 基本内存分配策略（简单静态分配）：
- 静态分配：每个VM获得固定大小的内存（如512MB）
- 无动态调整：不会根据负载变化调整内存大小
- 不支持交换：不会将内存页面交换到磁盘
- 原因：OS没有设计为处理物理内存变化

2. Balloon Driver机制（更复杂的动态分配）：
- balloon driver在OS内部运行
- 工作原理：
  * 通过"膨胀"来占用VM的内存
  * 从虚拟内存和文件缓存中回收页面
  * 将回收的页面提供给其他VM使用
  * 其他VM需要内存时这些balloon会收缩

3. 内存页面共享优化：
- 识别相同的物理页面（如全是0的页面）
- 使用写时复制(copy-on-write)机制在VM间共享这些页面
- 这可以节省物理内存使用
