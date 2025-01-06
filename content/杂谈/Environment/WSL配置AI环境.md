---
title: WSL配置AI环境
date: 2024-10-23
---

鉴于本人经常重置wsl和windows，所以写一篇来记录下配环境的过程，以免每次都要现查教程

# 安装Cuda
注意Cuda的版本需要和Pytorch的一致，我们安装目前最新的Cuda12.4

[官方教程](https://docs.nvidia.com/cuda/wsl-user-guide/index.html)

> 
Once a Windows NVIDIA GPU driver is installed on the system, CUDA becomes available within WSL 2. The CUDA driver installed on Windows host will be stubbed inside the WSL 2 as `libcuda.so`, therefore **users must not install any NVIDIA GPU Linux driver within WSL 2**. One has to be very careful here as the default CUDA Toolkit comes packaged with a driver, and it is easy to overwrite the WSL 2 NVIDIA driver with the default installation. We recommend developers to use a separate CUDA Toolkit for WSL 2 (Ubuntu) available from the [CUDA Toolkit Downloads](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0) page to avoid this overwriting. This WSL-Ubuntu CUDA toolkit installer will not overwrite the NVIDIA driver that was already mapped into the WSL 2 environment. To learn how to compile CUDA applications, please read the CUDA documentation for Linux. 

一旦系统上安装了 Windows NVIDIA GPU 驱动程序，CUDA 就可以在 WSL 2 中使用。安装在 Windows 主机上的 CUDA 驱动程序将在 WSL 2 中存根为`libcuda.so` ，因此**用户不得在 WSL 中安装任何 NVIDIA GPU Linux 驱动程序2** .这里必须非常小心，因为默认的 CUDA Toolkit 附带了一个驱动程序，并且很容易用默认安装覆盖 WSL 2 NVIDIA 驱动程序。我们建议开发人员使用可从 CUDA[工具包下载](https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0)页面获取的单独的 WSL 2 (Ubuntu) CUDA 工具包，以避免这种覆盖。此 WSL-Ubuntu CUDA 工具包安装程序不会覆盖已映射到 WSL 2 环境中的 NVIDIA 驱动程序。要了解如何编译 CUDA 应用程序，请阅读适用于 Linux 的 CUDA 文档。

---
Debian 类的wsl可以直接使用Ubuntu源的cuda-tookit 即可
(https://developer.nvidia.com/cuda-downloads?target_os=Linux&target_arch=x86_64&Distribution=WSL-Ubuntu&target_version=2.0&target_type=deb_network)

记得配置shell的环境变量
安装后输入nvcc -v 测试是否安装成功


# 安装Pytorch
直接到pytorch的官网(https://pytorch.org/get-started/locally/)去选择对应的命令下载即可

以及部分的AI相关库的安装
```shell
pip install scikit-learn matplotlib 
```

[10个推荐的AI库](https://www.unite.ai/zh-CN/%E7%94%A8%E4%BA%8E%E6%9C%BA%E5%99%A8%E5%AD%A6%E4%B9%A0%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD%E7%9A%84-10-%E4%B8%AA%E6%9C%80%E4%BD%B3-Python-%E5%BA%93/)



