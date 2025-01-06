---
date: 2025-01-04
--- 


![[07 Demanding Paging 需求分页1.png]]

将内存作为磁盘的缓存，是缓存的一种

![[07 Demanding Paging 需求分页2.png]]
内存虚拟化：连续的**大的**内存的抽象
![[07 Demanding Paging 需求分页3.png]]
# 内存映射文件
![[07 Demanding Paging 内存映射文件1.png]]
![[07 Demanding Paging 内存映射文件2.png]]
建立映射的时候，数据并没有读进来；当访问内存地址的时候，发现没有读进来，才会再读进来(页表)
![[07 Demanding Paging 内存映射文件3.png]]
![[07 Demanding Paging 内存映射文件4.png]]
MMap的最大好处是不知道要用到文件的哪一部分，让操作系统为我决定

# MMap如何实现
![[07 Demanding Paging MMap实现1.png]]
![[07 Demanding Paging MMap的实现.png]]
如何知道访问的页还没从磁盘读进来
![[07 Demanding Paging MMap实现2.png]]
![[07 Demanding Paging Page Fault之前.png]]
![[07 Demanding Paging 如何处理Page Fault.png]]
![[07 Demanding Paging Dirty Bit.png]]


# 物理页调度策略

![[07 Demanding Paging 物理页分配.png]]
如何从物理页找到页表项？(不讲)

驱逐哪个页？
![[07 Demanding Paging 页驱逐策略.png]]

![[07 Demanding Paging 页驱逐策略2.png]]
LRU的完全实现是很复杂的，可以用另一个策略(时钟算法)去近似

Why we can implement LRU for TLB entry replacement, but not demand paging replacement?
- TLB is purely handled in hardware(MMU)
- TLB has fewer entries (typically 16-512)

## 时钟算法
![[07 Demanding Paging 时钟算法1.png]]
![[07 Demanding Paging 时钟算法2.png]]
![[07 Demanding Paging 时钟算法3.png]]

![[07 Demanding Paging 时钟算法4.png]]
![[07 Demanding Paging 时钟算法5.png]]
![[07 Demanding Paging 时钟算法6.png]]
![[07 Demanding Paging 时钟算法7.png]]
![[07 Demanding Paging 时钟算法8.png]]
这里置换完页之后，指针应该指向3了，而不应该留在20，图有问题

![[07 Demanding Paging 时钟算法9.png]]
![[07 Demanding Paging 时钟算法10.png]]
![[07 Demanding Paging 时钟算法11.png]]
![[07 Demanding Paging 时钟算法12.png]]
![[07 Demanding Paging 时钟算法13.png]]
![[07 Demanding Paging 时钟算法14.png]]
![[07 Demanding Paging 时钟算法15.png]]
![[07 Demanding Paging 时钟算法16.png]]
![[07 Demanding Paging 时钟算法17.png]]
![[07 Demanding Paging 时钟算法18.png]]
相当于套了一层复活甲，扫到之后只是掉甲

指针移动很快这是一个不好的迹象，因为：
- 说明系统中大多数页面都是活跃的，很少有空闲页面
- 需要多次遍历才能找到可替换的页面，增加了开销
- 可能预示着系统即将发生颠簸(thrashing)

如果指针移动很慢的情况：
- 说明容易找到use bit=0的页面进行替换
- 表明系统中存在较多未被频繁访问的页面
- 这是一个好的迹象，因为：
    1. 系统有充足的非活跃页面可供替换
    2. 页面替换的开销较小
    3. 系统运行在一个健康的状态

![[07 Demanding Paging 时钟算法19.png]]
N越大越接近LRU，但是扫的速度变慢，开销越大

因为清除Dirty pages 和 Clean Page的代价不同，驱除 Dirty page的代价更大，所以有时候会给Dirty pages N = 2

![[07 Demanding Paging 时钟算法的细节.png]]

# Summary
![[07 Demanding Paging Allocation of Page Frames.png]]
Min-Max的思想，让最大值尽量小，让最小值尽量大，驱逐内存占用最大的

To support demand paging, what do CPU/OS contribute?
- CPU:memory management (MMU), a few bits in page table entry, etc
- OS: page table manipulation, eviction strategy, page fault handler, etc

![[07 Demanding Paging 安卓内存管理.png]]



