---
date: 2025-01-03
--- 

- What is OS?
- Why learn OS?
- CHanllenges and how to overcome?
- Brief history of OS

Warmsups
- Computer organization 计算机导论
- CPU, ISA, assembly, etc
- Lifetime of a "Hello World" programms

- CPU相关(上下文切换，线程)
- 内存（地址反应、TLB和缓存，需求分页）
- 调度
- 锁（条件变量、互斥锁、读写锁）
- IO设备和磁盘
- 文件系统设计
- 虚拟机


# What is OS?
- A bridge between hardware and apps/users
- a special software layer that provides and manages the access from apps/users to hardare resources(CPU, memory, disk, etc)
![Introduce 计算机架构](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/Introduce%20%E8%AE%A1%E7%AE%97%E6%9C%BA%E6%9E%B6%E6%9E%84.png)

## The Role of OS
- OS as referee
- OS as illusionist
- OS as glue


### as referee(裁判)
- Resource allocation
	- Multitasks on constrained resources
- Isolation(隔离)
	- Fault in one app shall not disrupt others
	- Prevent malicious attackers

资源分配和隔离(内存隔离)
### As illusionist



### As glue
- Providing common services to facilitate resource sharing
- Decouplu HW and app development

# Goal of OS
- Manage hardware resources
	- 管理硬件资源，如何去分配资源
- Facilitate app developers
- Facilitate users


# Warms up
CPU大致结构
![Introduce CPU 结构](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/Introduce%20CPU%20%E7%BB%93%E6%9E%84.png)
寄存器类型可能需要记一下

![Introduce CPU设计](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/Introduce%20CPU%E8%AE%BE%E8%AE%A1.png)
