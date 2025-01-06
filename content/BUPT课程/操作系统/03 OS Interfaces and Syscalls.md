---
date: 2025-01-04
--- 

 
 OS接口和系统调用

POSIX is a standard for UNIX OSes, especially its system calls

相当于是规范，人为定义的接口，跨平台编译友好性

libc: overview of standard C librries
- POSIX APIs like `getpid()` + standard C functions like `strcpy()`
- Apps do not directly invoke syscalls
- glibc:GNU C library

If a software is written with only dependency to libc, it has good protability across OSes/hardware

![[OS Interfaces and Syscalls POSIX and libc.png]]
![[OS Interfaces and Syscalls POSIX and libc 2.png]]

下面是用两个例子来将系统调用


# Process Management
![[03 OS Interfaces and Syscalls fork1.png]]
子父进程唯一的不同点是fork()的返回值，子进程返回0，父进程返回子进程的PID

![[03 OS Interfaces and Syscalls fork2.png]]
拷贝完后映射到不同的地址空间


![[03 OS Interfaces and Syscalls fork3.png]]
有一个lazy_copy的技术，只有在写的时候才真正拷贝一份，通过地址翻译实现
[[05 Address Translation#COW|COW]](copy on write)
![[03 OS Interfaces and Syscalls fork的例子.png]]

## 例题
![[03 OS Interfaces and Syscalls fork例题.png]]
第二题的做法
![[例题2解答.jpeg|300]]
![[例题3解答.jpeg]]
# Input/Output
![[03 OS Interfaces and Syscalls IO.png]]
![[03 OS Interfaces and Syscalls 文件描述符.png]]
这个在后续fs会讲到

每个进程都有自己的进程描述符表

文件描述符的一个例子
![[03 OS Interfaces and Syscalls 文件描述符的例子.png]]
![[03 OS Interfaces and Syscalls IO2.png]]
![[03 OS Interfaces and Syscalls IO3.png]]

- Uniformity:open, close, read and write
- Open before use
- Byte-oriented
	- Even if blocks are transferred, addressing is in bytes
- Kernel-buffered reads/writes
	- Streaming and block devices looks the same
	- Read blocks process, yielding process or to other task
	- Write does not block (even if it's faster than device receiving data)
- Explicit close
	- GC of unused kernel data structures

![[03 OS Interfaces and Syscalls IO4.png]]


# System Calls Design

![[03 OS Interfaces and Syscalls Ssystem Calls Design1.png]]
![[03 OS Interfaces and Syscalls System Calls Design2.png]]
![[03 OS Interfaces and Syscalls System Calls Design3.png]]
<mark style="background: #FF5582A6;">为什么要拷贝</mark>
- 安全性考虑，用户态的代码是可修改的，防止恶意以内核态权限执行恶意代码

会进行一些安全性检查

先拷贝再检查，而不能先检查再拷贝

信任内核代码，不能信任第三方代码
- 从可信任的Bootloader开始boot
- 有限的内核态接口：异常，中断，系统调用，只能从中断处理程序进入内核态
- 内存的隔离


