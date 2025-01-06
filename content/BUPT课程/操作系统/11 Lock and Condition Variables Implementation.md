---
date: 2025-01-05
--- 

# How to Implement Locks?

![11 Lock and Condition Variables Implementation 如何实现锁1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%94%811.png)
![11 Lock and Condition Variables Implementation 如何实现锁2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%94%812.png)
如何实现原子操作？需要关中断
![11 Lock and Condition Variables Implementation 如何实现锁3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%94%813.png)

"What happens with I/O or other important events?"（I/O或其他重要事件会怎样？）
- 在禁用中断期间，系统无法响应I/O事件
- 可能会丢失重要的外部事件
- 可能导致系统无法及时响应紧急情况

![11 Lock and Condition Variables Implementation 如何实现锁4](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%94%814.png)
![11 Lock and Condition Variables Implementation 如何实现锁5](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%94%815.png)
比起单纯的全局关中断，这种方式更好，只有在对锁的操作的时候才需要关中断

关中断检查锁的状态，避免中途被修改，保证原子性

提前开中断，不管是哪个位置开，都是存在问题的
![11 Lock and Condition Variables Implementation 如何实现锁6](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%94%816.png)
![11 Lock and Condition Variables Implementation 如何实现锁7](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%94%817.png)

![11 Lock and Condition Variables Implementation 如何实现锁8](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A6%82%E4%BD%95%E5%AE%9E%E7%8E%B0%E9%94%818.png)
thread switch出去的时候会自动打开中断，然后又遇到锁的时候又会关闭中断

# 多处理器实现锁
多处理器中又应该如何实现呢？
![11 Lock and Condition Variables Implementation 多处理器实现锁1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A4%9A%E5%A4%84%E7%90%86%E5%99%A8%E5%AE%9E%E7%8E%B0%E9%94%811.png)
![11 Lock and Condition Variables Implementation 多处理器实现锁2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A4%9A%E5%A4%84%E7%90%86%E5%99%A8%E5%AE%9E%E7%8E%B0%E9%94%812.png)
这三个都是原子操作
## 自旋锁
![11 Lock and Condition Variables Implementation 多线程实现锁3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E5%A4%9A%E7%BA%BF%E7%A8%8B%E5%AE%9E%E7%8E%B0%E9%94%813.png)
如果不用test&set，那就无法保证原子性，value值在中途会被改

![11 Lock and Condition Variables Implementation 自旋锁的问题1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E8%87%AA%E6%97%8B%E9%94%81%E7%9A%84%E9%97%AE%E9%A2%981.png)
拿不到锁会一直循环 busy-waiting，如何解决？能否放在等待队列中？

![11 Lock and Condition Variables Implementation 更好的自旋锁1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E6%9B%B4%E5%A5%BD%E7%9A%84%E8%87%AA%E6%97%8B%E9%94%811.png)
![11 Lock and Condition Variables Implementation 更好的自选锁2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E6%9B%B4%E5%A5%BD%E7%9A%84%E8%87%AA%E9%80%89%E9%94%812.png)
将test&set限制到一个地方，只有在获取guard变量的时候才短暂自旋

- **最小化自旋等待时间**
    - 普通自旋锁在整个等待过程中都在循环检查锁状态，持续消耗 CPU
    - 这个实现只在获取 guard 变量时短暂自旋
    - 一旦发现锁被占用，就将线程放入等待队列并切换上下文，而不是继续自旋
- **两级锁机制**
    - 使用 guard 和 value 两个变量来实现锁
    - guard 用于保护对 value 的访问，实现了更细粒度的控制
    - value 表示实际的锁状态
- **更好的资源利用**
    - 不需要持续轮询锁的状态
    - 线程在无法获取锁时会主动让出 CPU
    - 等待的线程被放入队列，而不是消耗 CPU 资源

![11 Lock and Condition Variables Implementation 中断开关和test&set锁的对比](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%B8%AD%E6%96%AD%E5%BC%80%E5%85%B3%E5%92%8Ctest%26set%E9%94%81%E7%9A%84%E5%AF%B9%E6%AF%94.png)
中断开关锁和自旋锁非常类似，就是将开关中断换为了自旋锁

自旋锁采用的是全局共享的变量，所以多处理器可以使用


# 条件变量实现
[[10 Lock and conditional variable design#Condition Variable条件变量|条件变量]]这里讲了基础概念

总的来说就是，拿锁，临时释放锁(等待条件满足)，拿锁，唤醒，再释放

![11 Lock and Condition Variables Implementation 条件变量实现1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E6%9D%A1%E4%BB%B6%E5%8F%98%E9%87%8F%E5%AE%9E%E7%8E%B01.png)
wake返回的时候，需要拿回锁。只有中途调用其他部分的时候，才是释放锁的

![11 Lock and Condition Variables Implementation 管程风格](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E7%AE%A1%E7%A8%8B%E9%A3%8E%E6%A0%BC.png)
![11 Lock and Condition Variables Implementation 管程风格2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E7%AE%A1%E7%A8%8B%E9%A3%8E%E6%A0%BC2.png)
![11 Lock and Condition Variables Implementation 管程风格3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E7%AE%A1%E7%A8%8B%E9%A3%8E%E6%A0%BC3.png)
下面是一个为什么用while的例子解释

![11 Lock and Condition Variables Implementation 例子1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%901.png)
![11 Lock and Condition Variables Implementation 例子2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%902.png)
这里发现队列是空的，需要等待条件完成才能继续执行，所以会释放锁，切换线程
![11 Lock and Condition Variables Implementation 例子3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%903.png)
![11 Lock and Condition Variables Implementation 例子4](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%904.png)
![11 Lock and Condition Variables Implementation 例子5](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%905.png)
![11 Lock and Condition Variables Implementation 例子6](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%906.png)
这里会等待的线程，但只是将Waiting 切换为了Ready，而不会立刻调度过去，需要等待线程2执行完
![11 Lock and Condition Variables Implementation 例子7](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%907.png)
![11 Lock and Condition Variables Implementation 例子8](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%908.png)
![11 Lock and Condition Variables Implementation 例子9](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%909.png)
![11 Lock and Condition Variables Implementation 例子10](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%9010.png)
![11 Lock and Condition Variables Implementation 例子11](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%9011.png)
![11 Lock and Condition Variables Implementation 例子12](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%9012.png)

![11 Lock and Condition Variables Implementation 例子13](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%9013.png)
![11 Lock and Condition Variables Implementation 例子14](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%9014.png)
所以不能是if，如果是if就直接跳出去了
![11 Lock and Condition Variables Implementation 例子15](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%9015.png)
![11 Lock and Condition Variables Implementation 例子16](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%9016.png)
![11 Lock and Condition Variables Implementation 例子17](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BE%8B%E5%AD%9017.png)

什么时候能用if？

![11 Lock and Condition Variables Implementation 什么时候能用if](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%BB%80%E4%B9%88%E6%97%B6%E5%80%99%E8%83%BD%E7%94%A8if.png)
Hoare模式

1. "Signaler gives up lock, CPU to waiter; waiter runs immediately"
- 当发出信号的线程（signaler）执行signal()操作时，它会：
  - 立即放弃锁
  - 放弃CPU控制权
  - 直接将这两个资源转交给等待的线程（waiter）
- 等待线程会立即执行，不需要重新竞争资源

2. "Waiter gives up lock, processor back to signaler when it exits critical section or if it waits again"
- 被唤醒的线程（waiter）在以下情况会将锁和CPU还给signaler：
  - 当它退出临界区时
  - 或者当它再次进入等待状态时

图示展示了这个过程：
- 左侧的signaler获取锁后，执行signal()操作
- 右侧的waiter之前因为条件不满足而等待
- signal()操作会直接将锁和CPU传递给waiter
- waiter执行完后再将控制权还给signaler

这种实现方式的特点：
1. 更高效：无需额外的调度开销
2. 更严格：保证被唤醒的线程能立即执行
3. 实现更复杂：需要保存和恢复多个线程的状态
4. 不够灵活：强制了线程执行的顺序


# 一些问题

![11 Lock and Condition Variables Implementation 一些问题](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/11%20Lock%20and%20Condition%20Variables%20Implementation%20%E4%B8%80%E4%BA%9B%E9%97%AE%E9%A2%98.png)
1. "Do lock.Acquire() and lock.Release() always trap into kernel?"
（lock.Acquire() 和 lock.Release() 是否总是需要陷入内核？）

答案：不是总需要陷入内核。
- 如果锁是空闲的，Acquire() 可以直接通过原子操作（如 test&set）获取锁，无需陷入内核
- 只有在以下情况才需要陷入内核：
  - 获取锁时发现锁被占用，需要将线程放入等待队列
  - 释放锁时需要唤醒等待队列中的线程
- 这种设计遵循了快速路径优化的原则，只在必要时才进行代价较大的内核操作


2. "Interrupt handlers must use spinlocks instead of queueing locks. Why?"
（为什么中断处理程序必须使用自旋锁而不是排队锁？）

答案：这是因为中断处理程序有几个重要特性：
- 中断处理程序不能睡眠（如注释所说："interrupt handlers are not supposed to sleep"）
- 原因如下：
  1. 如果中断处理程序睡眠，就需要保存和恢复中断上下文，这是很复杂的操作
  2. 中断处理程序本身就是为了快速响应硬件事件，不应该被阻塞
  3. 如果允许睡眠可能会导致死锁（比如等待的资源正好被中断的程序持有）
  4. 中断处理程序通常执行时间很短，用自旋锁更合适
  5. 中断上下文中没有完整的进程上下文，无法进行正常的进程调度

因此：
- 中断处理程序必须使用自旋锁
- 自旋锁保证了中断处理程序可以快速完成，不会睡眠
- 这种设计虽然可能会短暂占用CPU，但符合中断处理的特性要求










