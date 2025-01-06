---
date: 2025-01-03
--- 


# How computer boots

BIOS(Basic Input Output System)
- A firmware (固件)
- stored on ROM on motherboard(主板)

开机过程
1. 自检
2. 初始化硬件状态
3. Build HW description for advanced configuration and power interface(ACPI)
4. Load a bootloader from disk to memory
5. Transfer the control to the bootloader
	1. Setting %cs and %ip

Bootloader(引导加载程序) is part of OS
1. Switch from real mode to protected mode
2. Check if kernel image is okay
3. Loading kernel from disk to memory
4. Transfer the control to the "real" OS

## Real Mode vs Protected Mode

实模式（Real Mode）：
- 这是最初在 Intel 8086 处理器中引入的操作模式
- 允许程序直接访问系统硬件和内存，没有任何保护机制
- 内存寻址限制在 1MB（20位地址总线）
- 没有内存保护功能 - 任何程序都可以访问任何内存地址
- 不支持虚拟内存
- 程序和操作系统之间没有特权级别区分
- 主要在系统启动时使用，也用于早期的 DOS 操作系统

保护模式（Protected Mode）：
- 在 Intel 286 处理器中首次引入
- 支持内存保护和虚拟内存
- 具有更大的内存寻址能力（32位处理器可达4GB）
- 实现了四个特权级别（Ring 0-3）来分隔操作系统和用户程序
- 具备内存分段和分页功能
- 提供硬件级多任务支持
- 被现代操作系统使用，如 Windows、Linux 和 macOS
- 包含内存保护机制，防止程序之间相互干扰

BIOS vs Bootloader
![[Boot, Process, Kernel BIOS vs Bootloader.png]]

为什么BIOS不能直接load kernel，而是要通过Bootloader再transfer 一层？
- Flexibility and COmpatibility
- Boot Device Detection
- Boot Manager Functionality
- Security and Verification
- Error Handling
- Ease of Updates

![[Boot, Process, Kernel Booting 流程图.png]]

这里有个JOS的例子


## UEFI(Unified Extensible Firmware Interface)可扩展固件接口

A successor of BIOS
- faster
- filesystem support
- stored in various places: flash memory on mother board, hard drive, or even network share
- suports more input such as mouse
- secure boot
- better UI

是BIOS的继任者


# Process:concept and memory layout

Process: the execution of an application program with restricted rights
- Protection from each other;OS protected from processes
- Owns dedicated Address Space(later)
- Contexts of file descriptiors, filesystem, etc
- One or many threads (later)

How process differs from program?
- Process is an instance of program(进程是程序的一个实例)
- A program can have zero, one, or many processes executing it


## PCB
Process Control Block(PCB,进程控制块)

a data structure used by Linux to keep track of a process execution

- Process ID(PID)
- Process state(running, ready, waiting...)
- Process priority
- Program counter(PC指向当前执行的下一条指令)
- Memory related information
- Register information
- I/O status information (file descriptors, I/O devices)
- Accounting information

## Process in Memory


![[Boot, Process, Kernel Process in memory Example.png]]
![[Boot, Process, Kernel Process in Memory Example2.png]]
初始化数据放在.data, 未初始化数据放在.bss, 临时变量放在Stack, 分配的内存放在heap上

地址是虚拟地址，并非物理地址

Use `readelf` command to checkout what's in an executable

# Dual mode:kernel space vs user space

CPU的两种状态，内核态和用户态，区别体现在能否执行特权指令

Challenge
- Performance
- Control(isolation)
	- OS must take control whenever it wants
	- OS must controlhow certain resources can be accessed by processes;
	- A straightforward way to address this:let OS take charge of each instruction of process

basic approach: limited direct execution

Feature:
- restricted operations(特权指令)
- inter-process switching
	- Voluntary switching: system calls, wait(), etc 
	- Involuntary switching: timer interrupt(时钟中断)

单纯通过软件去实现是不够的，还需要硬件的辅助
- Hardware-assisted isolation and protection
	- User mode vs kernel mode
	- Trachers&TAs are in kernel mode, while strudents are in user mode


What HW needs to provide?
- Privileged instructions(特权指令)
- Memory protections(内存保护)
- Timer interrupts(时钟中断)
- Sage mode transfer(安全的模式切换)

![[Boot, Process, Kernel Privileged Instructions.png]]
If app executes a privileged instruction without permission
- Processor detects it in its HW logic, and throws an exception
- Process halted, OS takes over

## Memory Protection

### Segmentation
![[Boot, Process, Kernel 分段1.png]]
Disadvantages:
- No expandable heap and stack
- No memory sharing
- Memory fragmentation 外部碎片


### Paging
![[Boot, Process, Kernel 分页.png]]
![[Boot, Process, Kernel 分页2.png]]
用户态不能访问内存代码
![[Boot, Process, Kernel 分页3.png]]

>[!question] 
>Why kernel is placed at the high address?
>1. 通过地址空间分离实现安全
> - 将内核保持在高地址内存创建了用户空间（低地址）和内核空间（高地址）之间的清晰边界
> - 这有助于防止用户程序意外或恶意访问内核内存
> - 当进程在用户模式下运行时，较高的内存页面可以被标记为不可访问
> 2. 技术优势
> - 使内存映射更容易实现，因为用户空间在低地址有连续的空间可以使用
> - 简化了虚拟内存管理，因为内核空间在所有进程中保持一致
> - 便于实现ASLR（地址空间布局随机化）等功能
>
> 3. 历史原因
> - 许多计算机架构要求特定的内存布局才能正常运行
> - 高位内核和低位用户空间的分离成为一种被证明有效的通用模式
> 这种设计通常被称为"高半核心"（higher half kernel）设计。例如，在x86-64系统上，典型的分配是：
> - 用户空间：0x0000000000000000 - 0x00007FFFFFFFFFFF
> - 内核空间：0xFFFF800000000000 - 0xFFFFFFFFFFFFFFFF


## Timer Interrupts(时钟中断)
- A way for OS to regain the control to the CPU
	- An illusion: the program has the full control of CPU
	- it can execute an infinite loop
	- HW timer can only be reset in kernel mode

After timer interrupts, the OS **schedules** another process (could be the same one being interrupted) to run

时钟中断之后会重新调度一个线程


## Current Privilege Level (CPL)

x86 Architecture uses lower 2-bits in the **CS segment register**(referred to as Current Privilege Level bits).记住是在CS寄存器中的两个bit

- Yet most OSes only use level 0 (kernel mode) and level 3 (user mode)
![[Boot, Process, Kernel Protection Rings.png]]
- 5 switch to kernel mode
- 4 switch to user mode

# Questions
![[Boot, Process, Kernel 问题1.png]]
![[Boot, Process, Kernel  问题2.png]]
![[01 Boot, Process, Kernel 答案.png]]
1. 中断处理程序虽然是OS代码，但不一定运行在系统进程中：
- 可以在任何进程的上下文中执行
- 当中断发生时，会立即处理，不管当前运行的是什么进程

2. 举例：
- 进程A正在运行
- 发生硬件中断
- 中断处理程序在进程A的上下文中执行
- 使用的是进程A的内核栈

3. 重要特点：
- 中断处理程序是与进程上下文独立的
- 可以打断任何进程的执行
- 使用被中断进程的内核栈
- 执行完后返回被中断的进程








