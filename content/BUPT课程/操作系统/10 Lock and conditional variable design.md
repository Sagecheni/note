---
date: 2025-01-05
--- 


# Introduce
![10 Lock and conditional variable design 原子操作](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E5%8E%9F%E5%AD%90%E6%93%8D%E4%BD%9C.png)
 同步的一个例子
 ![10 Lock and conditional variable design 一个例子](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E4%B8%80%E4%B8%AA%E4%BE%8B%E5%AD%90.png)
 ![10 Lock and conditional variable design 一些概念定义1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E4%B8%80%E4%BA%9B%E6%A6%82%E5%BF%B5%E5%AE%9A%E4%B9%891.png)
 临界区：只有一个线程能在同一时间内执行，不允许多个线程同时访问的代码
 
 ![10 Lock and conditional variable design 一些概念定义2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E4%B8%80%E4%BA%9B%E6%A6%82%E5%BF%B5%E5%AE%9A%E4%B9%892.png)
 ![10 Lock and conditional variable design 锁1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E9%94%811.png)
![10 Lock and conditional variable design 锁2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E9%94%812.png)
T3正确，其余都错误

# Condition Variable条件变量
![10 Lock and conditional variable design 条件变量1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E6%9D%A1%E4%BB%B6%E5%8F%98%E9%87%8F1.png)
如果一个线程拿了锁，但是又依赖于其他线程的操作

允许一个拿了锁的线程临时去释放自己的锁，直到满足条件唤醒

Signal和Broadcast需要区分下
![10 Lock and conditional variable design 条件变量2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E6%9D%A1%E4%BB%B6%E5%8F%98%E9%87%8F2.png)
![10 Lock and conditional variable design 条件变量3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E6%9D%A1%E4%BB%B6%E5%8F%98%E9%87%8F3.png)

如果需要插入元素时队列是满的，那么需要等队列空出来再插入元素；remove同理

remove()如何实现？
```CPP
bounded_queue::remove(){
	lock.acquire();
	while(queue.empty()){
	itemAdded.wait(&lock);
	}
	int item = get_item();
	itemRemoved.signal();
	lock.release();
	return item
}
```


![10 Lock and conditional variable design 条件变量4](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E6%9D%A1%E4%BB%B6%E5%8F%98%E9%87%8F4.png)
条件变量只有在拿着锁的时候才会使用，等待的时候会自动release锁，但是被唤醒的时候会重新拿回锁


为什么是while 循环？

使用while循环而不是if主要是为了防止**虚假唤醒**(spurious wakeup)问题。

1. 虚假唤醒的问题：
- 条件变量可能在没有实际signal()调用的情况下唤醒
- 操作系统可能错误地唤醒等待的线程
- 有时一个signal()可能唤醒多个等待的线程

2. 如果使用if的潜在问题：
```cpp
// 使用if的问题代码
if (queue.full()) {
    itemRemoved.wait(&lock);  // 如果这里发生虚假唤醒
}
add_item(item);  // 队列可能仍然是满的！
```

3. while循环的保护机制：
```cpp
// 安全的实现
while (queue.full()) {
    itemRemoved.wait(&lock);  // 即使发生虚假唤醒
    // 会再次检查条件，确保队列真的有空间
}
add_item(item);  // 确保队列一定有空间
```

4. while循环的优势：
- 每次被唤醒时都会重新检查条件
- 确保条件满足才会继续执行
- 提供了额外的安全检查层
- 使代码更加健壮和可靠

使用while循环是一种防御性编程的实践，可以确保在并发环境下程序的正确性。

# Semaphores 信号量
![10 Lock and conditional variable design 信号量1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E4%BF%A1%E5%8F%B7%E9%87%8F1.png)
P操作：试图将值-1，如果值=0，那么就等到非零

V操作：试图将值+1，并唤醒等待的P

![10 Lock and conditional variable design 信号量2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E4%BF%A1%E5%8F%B7%E9%87%8F2.png)
原子操作
有两个P操作，只有一个可以降为0，另一个只有等到一个V操作之后才能P

![10 Lock and conditional variable design 信号量3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E4%BF%A1%E5%8F%B7%E9%87%8F3.png)
如何用信号量去实现一个锁？拿锁P，释放锁V

A线程想等到B线程执行完再执行？
- 信号量设置为0，A线程P一下，B线程执行完后会V一下，那么等到V之后才会执行A线程的P

## Producer - Consumer with a Bounded Buffer
如何用信号量去解决生产消费者问题？
![10 Lock and conditional variable design 生产者消费者问题](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%B6%88%E8%B4%B9%E8%80%85%E9%97%AE%E9%A2%98.png)

![10 Lock and conditional variable design 生产者消费者问题2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E7%94%9F%E4%BA%A7%E8%80%85%E6%B6%88%E8%B4%B9%E8%80%85%E9%97%AE%E9%A2%982.png)
限制
- 如果队列空，消费者必须等到生产者填入buffer
- 如果队列满，生产者必须等到消费者取走buffer
- 只有一个线程能在一个时间内操作buffer queue


![10 Lock and conditional variable design 信号量解决生产者消费者问题](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E4%BF%A1%E5%8F%B7%E9%87%8F%E8%A7%A3%E5%86%B3%E7%94%9F%E4%BA%A7%E8%80%85%E6%B6%88%E8%B4%B9%E8%80%85%E9%97%AE%E9%A2%98.png)
对于解决方案的讨论

为什么消费者和生产者的操作不是对称的？
![10 Lock and conditional variable design 对solution的讨论1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E5%AF%B9solution%E7%9A%84%E8%AE%A8%E8%AE%BA1.png)
- 生产者和消费者的操作顺序是不对称的，这是由于它们的功能不同：
    - 生产者：先检查空槽位(emptySlots.P())，再增加已占用槽位(fullSlots.V())
    - 消费者：先检查已占用槽位(fullSlots.P())，再增加空槽位(emptySlots.V())
- 这种不对称设计确保了资源的正确管理和同步

![10 Lock and conditional variable design 对solution的讨论2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E5%AF%B9solution%E7%9A%84%E8%AE%A8%E8%AE%BA2.png)
P操作的顺序很重要，必须先获取资源信号量，再获取互斥锁

如果顺序反过来（如图中红色标注的错误顺序）可能导致死锁：
- 如果先获取mutex，一个线程可能在等待资源时阻塞住mutex
- 其他线程因无法获取mutex而无法释放资源
- 形成死锁

![10 Lock and conditional variable design 对solution的一些讨论3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E5%AF%B9solution%E7%9A%84%E4%B8%80%E4%BA%9B%E8%AE%A8%E8%AE%BA3.png)
What if we have 2 producers or 2 consumers?（如果有多个生产者或消费者呢？）
- 这个实现可以支持多个生产者和消费者
- mutex确保了对缓冲区的互斥访问
- 信号量机制确保了资源的正确同步
- 多个生产者/消费者的情况下，该方案仍然可以正确工作，不需要修改代码


![10 Lock and conditional variable design 一些建议](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/10%20Lock%20and%20conditional%20variable%20design%20%E4%B8%80%E4%BA%9B%E5%BB%BA%E8%AE%AE.png)



