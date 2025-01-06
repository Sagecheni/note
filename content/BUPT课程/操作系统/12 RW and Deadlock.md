---
date: 2025-01-05
--- 


# Readers/Writers Lock 读写锁

![RW and Deadlock 读写者问题](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E8%AF%BB%E5%86%99%E8%80%85%E9%97%AE%E9%A2%98.png)
![RW and Deadlock 读写锁约束](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E8%AF%BB%E5%86%99%E9%94%81%E7%BA%A6%E6%9D%9F.png)
四个全局变量
- AR：在读的读者
- WR：在等的读者
- AW：在写的写者
- WW：在等的写者

![RW and Deadlock 读写锁基本实现1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E8%AF%BB%E5%86%99%E9%94%81%E5%9F%BA%E6%9C%AC%E5%AE%9E%E7%8E%B01.png)
![RW and Deadlock 读写锁基本实现2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E8%AF%BB%E5%86%99%E9%94%81%E5%9F%BA%E6%9C%AC%E5%AE%9E%E7%8E%B02.png)
为什么要给写者优先度？
- 先改动再被读

这种实现，写者不会被饥饿，因为当WW>0的时候，读者不能读

## 一些问题
![RW and Deadlock Q1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20Q1.png)

![RW and Deadlock Q2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20Q2.png)
左边代码改为broadcast会通知所有写者，可以这么做，只有一个返回的写者能拿到锁，然后while((AW+AR))>0会重新判断

右边代码从broadcast改为signal会通知一个读者，会有问题，只唤醒一个读者，读者会积累。
![RW and Deadlock Q3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20Q3.png)
![RW and Deadlock Q5](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20Q5.png)
如果R1唤醒了R2，但是R2由于(WW>0)无法读，所以会陷入死锁
![RW and Deadlock Q6](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20Q6.png)

## 实现读写锁

![RW and Deadlock 实现读写锁1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E5%AE%9E%E7%8E%B0%E8%AF%BB%E5%86%99%E9%94%811.png)
![RW and Deadlock 实现读写锁2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E5%AE%9E%E7%8E%B0%E8%AF%BB%E5%86%99%E9%94%812.png)
![RW and Deadlock 实现读写锁3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E5%AE%9E%E7%8E%B0%E8%AF%BB%E5%86%99%E9%94%813.png)


# Deadlock 死锁
![RW and Deadlock 死锁概念1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%AD%BB%E9%94%81%E6%A6%82%E5%BF%B51.png)
![RW and Deadlock 死锁概念2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%AD%BB%E9%94%81%E6%A6%82%E5%BF%B52.png)
![RW and Deadlock 死锁概念3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%AD%BB%E9%94%81%E6%A6%82%E5%BF%B53.png)
同一个顺序获取锁，就不会死锁

![RW and Deadlock 死锁概念4](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%AD%BB%E9%94%81%E6%A6%82%E5%BF%B54.png)
死锁一定会饥饿，饥饿不一定会死锁
![RW and Deadlock 死锁例子1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%AD%BB%E9%94%81%E4%BE%8B%E5%AD%901.png)
![RW and Deadlock 死锁例子2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%AD%BB%E9%94%81%E4%BE%8B%E5%AD%902.png)
草，当初上课看到这个图想到的是JOJO6里面的大总统拿餐巾纸
![RW and Deadlock 额外笑话-大总统餐巾纸](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E9%A2%9D%E5%A4%96%E7%AC%91%E8%AF%9D-%E5%A4%A7%E6%80%BB%E7%BB%9F%E9%A4%90%E5%B7%BE%E7%BA%B8.png)

## 产生死锁的条件
![RW and Deadlock 产生死锁的条件](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E4%BA%A7%E7%94%9F%E6%AD%BB%E9%94%81%E7%9A%84%E6%9D%A1%E4%BB%B6.png)
两种或两种以上的资源才会死锁
![RW and Deadlock 死锁发生的条件2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%AD%BB%E9%94%81%E5%8F%91%E7%94%9F%E7%9A%84%E6%9D%A1%E4%BB%B62.png)

> [!important]
> <mark style="background: #FF5582A6;">死锁的四个条件</mark>
> - 互斥
> - 获取并等待
> - 没有抢占
> - 循环等待

## 如何处理死锁
Allow system to enter deadlock and then recover(允许进入死锁状态并恢复)
- Requires deadlock detection algorithm
- Some technique for forcibly preempting resources and/or terminating tasks

Ensure that system will never enter a deadlock(不允许系统进入死锁状态)
- Need to monitor all lock acquisitions
- Selectively deny those that might lead to deadlock

Ignore the problem and pretend that deadlocks never occur in the system(鸵鸟算法，现实中使用最多的，OS不会管你是否进入死锁)
- Used by most operating systems, including UNIX

## 如何避免进入死锁
破除死锁的四个条件

1. No circular wait

![RW and Deadlock 破坏循环等待](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E7%A0%B4%E5%9D%8F%E5%BE%AA%E7%8E%AF%E7%AD%89%E5%BE%85.png)
让所有锁的获取是顺序的，那么就不会陷入死锁

![RW and Deadlock 破除循环等待2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E7%A0%B4%E9%99%A4%E5%BE%AA%E7%8E%AF%E7%AD%89%E5%BE%852.png)
在函数内部不知道函数调用顺序的解决方式

问题是需要开发者小心地进行设计和编程

并不是所有资源在写前就知道要被用到的，很难满足要求

2. 破除获取并等待
![RW and Deadlock 破除获取并等待](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E7%A0%B4%E9%99%A4%E8%8E%B7%E5%8F%96%E5%B9%B6%E7%AD%89%E5%BE%85.png)
锁住锁的锁

问题是必须在用之前就知道哪些锁会被用到，而且并行度下降了

扩大了临界区的大小

3. 打破互斥

![RW and Deadlock 打破互斥](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%89%93%E7%A0%B4%E4%BA%92%E6%96%A5.png)
![RW and Deadlock 打破互斥2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%89%93%E7%A0%B4%E4%BA%92%E6%96%A52.png)
为什么用while?防御性编程
![RW and Deadlock 打破互斥3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%89%93%E7%A0%B4%E4%BA%92%E6%96%A53.png)
上面的实现会有同步问题
![RW and Deadlock 打破互斥4](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/RW%20and%20Deadlock%20%E6%89%93%E7%A0%B4%E4%BA%92%E6%96%A54.png)

4. 智能调度

银行家算法

![12 RW and Deadlock 资源1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E8%B5%84%E6%BA%901.png)
锁是一种资源

T1、T2是线程，R1、R2是资源

能改变的是多个线程之间获取和释放资源的先后关系
![12 RW and Deadlock 资源2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E8%B5%84%E6%BA%902.png)
图2死锁
![12 RW and Deadlock 死锁4](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E6%AD%BB%E9%94%814.png)

![12 RW and Deadlock 死锁检测算法](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E6%AD%BB%E9%94%81%E6%A3%80%E6%B5%8B%E7%AE%97%E6%B3%95.png)
遍历T，找到满足资源的T，然后删掉；如果无法满足全部的T，那么就死锁

从出度为0的资源出发

![12 RW and Deadlock 死锁检测算法2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E6%AD%BB%E9%94%81%E6%A3%80%E6%B5%8B%E7%AE%97%E6%B3%952.png)

![12 RW and Deadlock 资源是动态获取的](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E8%B5%84%E6%BA%90%E6%98%AF%E5%8A%A8%E6%80%81%E8%8E%B7%E5%8F%96%E7%9A%84.png)
# 银行家算法

![12 RW and Deadlock 银行家算法1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%951.png)
不知道精确的资源获取数，但是知道资源所需的最大值。（要保证不会出现用户拿不出钱的情况）
![12 RW and Deadlock 银行家算法2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%952.png)
每一个线程在试图获取资源的时候，调度器会判断，如果给了资源，是否会进入死锁；如果会，则跳过该线程，先服务其他的线程；如果不会，则给资源

![12 RW and Deadlock 银行家算法3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%953.png)
安全状态：不管资源申请顺序，都存在一种调度的方法能让任务执行完
不安全状态：不管怎么调度，都会进入死锁状态

![12 RW and Deadlock 银行家算法4](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%954.png)
银行家算法的本质就是让自己一直保持在安全状态

![12 RW and Deadlock 银行家算法5](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%955.png)

![12 RW and Deadlock 银行家算法6](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%956.png)
如果算法可以跑完，说明在安全状态
![12 RW and Deadlock 银行家算法7](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%957.png)

![12 RW and Deadlock 银行家算法8](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%958.png)

![12 RW and Deadlock 银行家算法9](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%93%B6%E8%A1%8C%E5%AE%B6%E7%AE%97%E6%B3%959.png)
注意这个表怎么画

不安全状态不一定导致死锁，但是安全状态一定不会死锁



Smart scheduling
- banking algorithm
- Cons: must know the entire set of tasks and their resource demands beforehand; concurrency decreased.
- Only used in limited scenarios such as embedded system.

![12 RW and Deadlock 防止死锁的技术](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%98%B2%E6%AD%A2%E6%AD%BB%E9%94%81%E7%9A%84%E6%8A%80%E6%9C%AF.png)
无限资源

demanding paging可以将内存当作磁盘的缓存，当虚拟页放不下的时候，把一些页放到磁盘中，当需要的时候再调度回来

![12 RW and Deadlock 防止死锁2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/12%20RW%20and%20Deadlock%20%E9%98%B2%E6%AD%A2%E6%AD%BB%E9%94%812.png)









