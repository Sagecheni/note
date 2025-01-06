---
date: 2025-01-05
--- 


# I/O Devices
![13 IO Devices and storage 一个简单的IO设备](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84IO%E8%AE%BE%E5%A4%87.png)
![13 IO Devices and storage 一个简单的IO2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84IO2.png)
![13 IO Devices and storage 一个简单的IO3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84IO3.png)
## DMA
![13 IO Devices and storage DMA1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20DMA1.png)
DMA (Direct Memory Access) 是一种允许外部设备直接和内存进行数据传输的机制，无需CPU的直接干预。

1. 工作原理：
- CPU设置DMA控制器的参数（源地址、目标地址、传输数据量等）
- DMA控制器直接控制系统总线
- 数据传输完成后，DMA控制器向CPU发出中断信号

2. 主要特点：
- 减轻CPU负担
- 提高系统性能
- 数据传输速度快
- 适合大量数据传输

3. 应用场景：
- 磁盘I/O操作
- 网络数据传输
- 打印机输出
- 声卡数据传输
- 显卡数据传输

4. 传输模式：
- 单字节传输：每次传送一个字节
- 块传输：每次传送一块数据
- 突发传输：连续传送多个数据块
- 循环窃取：在CPU不使用总线时传输数据

DMA的使用大大提高了计算机系统的I/O效率，是现代计算机系统中不可或缺的组成部分。

DMA自动去做数据拷贝
![13 IO Devices and storage 最简单的IO设备](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84IO%E8%AE%BE%E5%A4%87.png)
![13 IO Devices and storage 最简单的IO设备2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84IO%E8%AE%BE%E5%A4%872.png)

# Storage Devices

![13 IO Devices and storage 存储金字塔](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E5%AD%98%E5%82%A8%E9%87%91%E5%AD%97%E5%A1%94.png)
![13 IO Devices and storage 磁盘的结构](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E7%A3%81%E7%9B%98%E7%9A%84%E7%BB%93%E6%9E%84.png)
磁头转是为了找磁道，磁盘转的目的是为了找扇区

存储数据的容量=磁头数量\*磁道数量\*扇区数量\*扇区大小

![13 IO Devices and storage 磁盘2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E7%A3%81%E7%9B%982.png)
![13 IO Devices and storage 磁盘3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E7%A3%81%E7%9B%983.png)
<mark style="background: #FF5582A6;">如何去计算这三个时间？</mark>
![13 IO Devices and storage 磁盘时间相关计算](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E7%A3%81%E7%9B%98%E6%97%B6%E9%97%B4%E7%9B%B8%E5%85%B3%E8%AE%A1%E7%AE%97.png)
假设
- 寻道时间是5ms
- 转速为7200RPM，Time for rotation:$60000(ms/minute)/7200(rev/min)~=8ms$
- 传输速度是4MBytes/s，扇区大小是1 Kbyte

Read sector from random place on disk:
- $5+\frac{8}{2}+ \frac{1Kbytes}{4MBytes}=5+4+0.26=9.26ms$
- Approx 10ms to fetch/put data: 100KByte/sec

Read sector from random place in same cylinder:
- 相同磁道读取扇区，不需要寻道时间了
- $4ms+0.26ms=4.26ms$
- Approx 5ms to fetch/put data : 200 KByte/sec

Read next sector on same track:
- $0.26ms$
- 4 MByte/sec


# SSD
这部分并不是重点，看看得了
![13 IO Devices and storage SSD](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20SSD.png)

# Disk Scheduling

![13 IO Devices and storage 磁盘调度1](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E7%A3%81%E7%9B%98%E8%B0%83%E5%BA%A61.png)
![13 IO Devices and storage 磁盘调度2](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E7%A3%81%E7%9B%98%E8%B0%83%E5%BA%A62.png)
![13 IO Devices and storage 磁盘调度3](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E7%A3%81%E7%9B%98%E8%B0%83%E5%BA%A63.png)
- 磁头在磁盘表面来回移动，类似电梯在大楼上下运行
- 在一个方向上移动时，处理所有该方向上的请求，直到到达磁盘边界
- 到达边界后改变方向，再处理反方向上的所有请求
![13 IO Devices and storage 磁盘调度4](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E7%A3%81%E7%9B%98%E8%B0%83%E5%BA%A64.png)
![13 IO Devices and storage 一个read函数会经历的](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/BUPTCourse/OS/13%20IO%20Devices%20and%20storage%20%E4%B8%80%E4%B8%AAread%E5%87%BD%E6%95%B0%E4%BC%9A%E7%BB%8F%E5%8E%86%E7%9A%84.png)

