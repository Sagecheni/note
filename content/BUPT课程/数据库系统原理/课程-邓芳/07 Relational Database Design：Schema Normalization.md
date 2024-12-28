---
draft: false
date: 2024-12-27
---
这节课我是听的[数据库第6章 关系数据理论（第二部分：范式理论 1NF-2NF-3NF）](https://www.bilibili.com/video/BV1wv4y1m7J2/?share_source=copy_web&vd_source=2a3aa84c3f53d4bab014b8577b9cfc7b)
也会有部分邓芳老师课程(英文部分)
# 范式理论
- 函数依赖
- 码
- 范式
- 2NF
- 3NF
- BCNF
- 多值依赖
- 4NF
- 规范化小结

范式级别表示的是这个范式的水平，级别越好，表示的越好
目标要求：
1. 判断是什么范式的表
2. 如何升级成更高范式的表

## 函数依赖
- 函数依赖的Def
- 平凡函数依赖与**非平凡函数依赖**
- **完全函数依赖**与部分函数依赖
- 传递函数依赖
### Def
定义：设R(U)是一个属性集上的关系模式，X和Y是U的子集。若对R(U)的任意一个可能的关系r（对表上的一行），r不可能存在两个元组在X上的属性值相等，而在Y的属性值不等，则称“X函数确定Y”或“Y函数依赖于X”，记作$X \to Y$。

1. 先找候选键
2. 再找主属性(候选键包含的属性)，区分主属性和非主属性

![[07 Chapter7 Relational Database DesignSchema Normalization 函数依赖例子.png]]
### 平凡/非平凡函数依赖
- $X \to Y,Y \not\subseteq X$则称$X \to Y$是非平凡的函数依赖
	- (<mark style="background: #FF5582A6;">Sno</mark>,<mark style="background: #FF5582A6;">Cno</mark>,Grade) $(Sno,Cno)\to Grade$
- $X \to Y,Y \subseteq X$则称$X\to Y$是平凡的函数依赖
	- $(Sno,Cno) \to Sno \to Cno$

若$X \to Y$，则X称为这个函数依赖的决定因素
若$X \to Y,Y\to X$，则记作$X \leftarrow \rightarrow Y$

### 完全函数依赖与部分函数依赖
Def:

在R(U)中，如果$X \to Y$，并且对于X的任何一个真子集X',都有$X' \not \to Y$，则称Y对X完全函数依赖，记作$X\overset{F}{\to}Y$

若$X \to Y$，但Y不完全函数依赖于X，则称Y部分函数依赖于X，记作$X\overset{P}{\to}Y$

只需要X的部分属性(X的某个真子集)就能确定Y

题目中如何判断：
- 求出左边的真子集的闭包，看是否包含右边




### 传递函数依赖
Def:

在R(U)中，如果$X\to Y(Y\not\subseteq X),Y \not \to X,Y\to Z,Z \not \subseteq Y$，则称Z对X传递函数依赖

Noted:如果$Y\to X,即X\leftarrow \to Y$，则Z直接依赖于X，而不是传递函数依赖

### Keys and Functional Dependencies
Def:*K* is a **superkey** for relation schema *R* if and only if $K \to R$

Def:*K* is a **candidate key** for R if and only if
- $K\to R, and$
- for no $\alpha \subset K, \alpha \to R$（最小性）

DF allow constraints that cannt be expressed with superkeys.





## 范式
Def：符合某一种级别的关系模式的集合

![[07 Chapter7 Relational Database DesignSchema Normalization 范式关系图.png]]
1、2、3、BC范式是函数依赖
4、5NF是多值依赖
1NF：一个表中，每个格都是不可再细分的数据项

一个关系模式不属于3NF，会产生以下的问题：

数据冗余和增删改的异常
- 插入异常
	- 如果插入一个新学生，但该学生未选课，即该生无Cno，由于插入元组的时候必须给定主键，因此插入失败
- 删除异常
	- 如果S4只选了一门课C3，现在他不再选这门课，则删除C3后，整个元组的其他信息也被删除了
- 修改复杂
	- 如果一个学生选了多门课，则Sdept, Sloc被存储了多次。仍哦该生转系，需要修改所有相关的Sdept和Sloc，造成修改的复杂化

## 2NF
Def：若关系模式$R\in 1NF$，并且**每个非主属性都完全函数依赖于任何一个候选键**，则$R \in 2NF$

消除非主属性对主属性的部分函数依赖

即没有部分函数依赖
![[07 Chapter7 Relational Database DesignSchema Normalization 2NF例子.png]]
1. 找候选键，判断主属性和非主属性
2. 从主属性开始写，把所有的函数依赖关系列出来
![[07 Chapter7 Relational Database DesignSchema Normalization 2NF例子2.png]]



### 如何升级为2NF
用投影分解把关系模式S-L-C分解为两个关系模式

![[07 Chapter7 Relational Database DesignSchema Normalization 2NF例子3.png]]

“谁跟你好，复制自己，把他带走”
![[07 Chapter7 Relational Database DesignSchema Normalization 2NF例子4.png]]

## 3NF

Def：设关系模式$R<U,F>\in 1NF$，若R中不存在这样的键X、属性组Y以及非主属性Z($Y\not\subseteq Z$)，使得$X\to Y,Y\to Z$成立，$Y\not \to X$不成立，则称$R<U,F> \in 3NF$

非主属性对主属性没有传递函数依赖就是3NF

要求任意的一个函数依赖关系都要满足以下条件的一个
- 平凡依赖
- 左边是超键
- 右边是键属性

- SC没有传递依赖，因此$SC \in 3NF$

![[07 Chapter7 Relational Database DesignSchema Normalization 3NF例子.png]]

## BCNF
- 除了平凡依赖，左边都要是超键

Def: 设关系模式$R<U,F>\in 1NF$，若$X\to Y$且$Y \subseteq X$时，X必含有键，则$R<U,F> \in BCNF$


# 数据依赖的公理体系

## Armstrong's Axioms
- reflexivity(自反律):$if\;\beta \subseteq \alpha, then\; \alpha \to \beta$
- Augmentation(增广律):$if \;\alpha \to \beta, then\; \gamma \alpha \to \gamma \beta$
- transitivity(传递律):$if \; \alpha \to \beta,and \; \beta \to \gamma, then \; \alpha \to \gamma$

可以得到三条推理规则
- 合并规则:$X \to Y, X\to Z \Rightarrow X\to YZ$
- 伪传递规则:$X\to Y,WY \to Z \Rightarrow XW \to Z$
- 分解规则:$X\to Y,Z\subseteq Y \Rightarrow X\to Z$

## 函数依赖集的闭包
- For R(U,F), The set of all functional dependencies logically implied by *F* is the *closure* of F.
	- E.g. If $A \to B$ and $B \to C$, then we can infer that $A\to C$
- We denote the *closure* of F by $F^+$

根据F能推导出来的所有函数依赖的集合，写了的+没写的

E.g.
$$
U=\{A,B,C,D,E\},F=\{A\to B,B\to C,D\to E\}
$$
则
$$
F^+=\{A\to B,B\to C,D\to E,A\to C \}
$$

这里的闭包求法其实在大二下的形式语言与自动机已经学过了

E.g.

已知关系模式$R<U,F>$，其中
$$
\begin{align}
&U=\{A,B,C,D,E\}; \\
&F=\{AB \to C,B\ to D,C\to E,EC \to B,AC\to B\}. \\
&求(AB)_{F}^*
\end{align}
$$

Solution:
$$
\begin{align}
&X_{0} = \{AB\} \\
&X_{1} = X_{0} + CD=ABCD \\
&X_{2} = X_{1} + CDEB =ABCDE=U\\ \\
&stop
\end{align}
$$
Conclusion:$AB\to U$,so $(AB)_{F}^* = U=ABCDE$

![[07 Chapter7 Relational Database DesignSchema Normalization 有效性与完备性.png]]
## F的最小依赖集

Def：如果函数依赖集F满足下列条件，则称F为一个最小依赖集或者最小覆盖(离散数学下)
1. F中任一函数依赖的右部仅含有一个属性
	- E.g.$A\to BC \Rightarrow A \to B,A\to C$
2. F中不存在这样的函数依赖$X \to A$，使得F与$F - \{X \to A\}$等价
	- 不存在冗余的DF，先删除看看是否能推出
3. F中不存在这样的函数依赖$X \to A$，X有真子集Z使得$F-\{X\to A\}\cup\{Z\to A\}$与F等价
	- 留下最简单的

并非唯一



函数依赖集等价
Def:如果$G^+=F^+$，就说函数依赖集F覆盖G或F与G等价

两个函数依赖集等价是指他们的闭包等价



# Decomposition(分解)

Decide whether a particular relation *R* is in "good" form.

All attributes of an original schema (R) must appear in the decomposition ($R_{1},R,2,\dots,R_{n}$):
$$
R = R_{1} \cup R_{2} \cup\dots \cup R_{n}
$$

### Lossless-join decomposition(无损连接的分解)
decompose R into a set of relations {$R_{1},R_{2}\dots,R_{n}$}, For all posisible relations *r* on schema *R*
$$
r = \Pi_{R_{1}}(r) \bowtie \Pi_{R_{2}}(r) \bowtie \dots \bowtie \Pi_{R_{n}}(r)
$$

A decomposition of R into $R_{1}$ and $R_{2}$ is lossless join if and only if at least one of the following dependencies is in $F^+$:
- $R_{1} \cap R_{2} \to R_{1}$
- $R_{1} \cap R_{2} \to R_{2}$

E.g.

$$
\begin{align}
&R=(A,B,C) \\
&F=\{A \to B,B \to C\} \\
&R_{1} = (A,B) \\
&R_{2} = (B,C)
\end{align}
$$
$R_{1} \cap R_{2} = \{B\}$ and $B^+ = BC$


## Dependency preservation(函数依赖保持)

decompose a relation schema *R* with a set of functional dependencies *F* into $R_{1},R_{2},\dots,R_{n}$. Let $F_{i}$ be the set of dependencies $F^+$ that include only attributes in $R_{i}$
$$
\begin{align}
&(F_{1}\cup F_{2}\cup\dots \cup F_{n})^+ = F^+ \\
&F_{i} = \{X \to Y| X\to Y \in F^+ \cap XY \subseteq R_{i}\}
\end{align}
$$
E.g.
$$
\begin{align}
&R=(A,B,C),F=\{A \to B,B\to C\} \\
&R_{1}=(A,B),R_{2}=(B,C)
\end{align}
$$
How to check if a dependency $\alpha \to \beta$ is preserved in a decomposition of R into $R_{1},R_{2},\dots,R_{n}$

>[!code]
>result = $\alpha$
>**while** (changes to result) do
>&emsp;&emsp;for each $R_{i}$ in the decomposition
>&emsp;&emsp;&emsp;&emsp;t = $(result \cap R_{i})^+(F)\cap R_{i}$
>&emsp;&emsp;&emsp;&emsp;$result = result \cup t$
>if *result* contains all attributes in $\beta$, then the funcitonal dependency $\alpha \to \beta$ is preserved.

E.g.
![[07 Chapter7 Relational Database DesignSchema Normalization 函数依赖是否丢失判定.png]]

## 3NF Decomposition Algorithm

>[!code]
>Let $F_{c}$ be a canonical cover for F;(求F的最小函数依赖集$F_{c}$)
>$\qquad\qquad$i:=0
>for each functional dependency $\alpha \to \beta$ in $F_{c}$ do
>if none of the schemas $R_{j}$, $1\leq j \leq i$ contains $\alpha \beta$
>$\qquad\qquad\qquad\qquad$then begin
>$\qquad\qquad\qquad\qquad\qquad$i:=i+1;
>$\qquad\qquad\qquad\qquad\qquad R_{i}:=\alpha \; \beta$
>$\qquad\qquad\qquad\qquad$end
>if none of the schemas $R_{j},1\leq j\leq i$ contains a candidate key for R
>$\qquad\qquad\qquad\qquad$then begin
>$\qquad\qquad\qquad\qquad\qquad\qquad i:=i+1;$
>$\qquad\qquad\qquad\qquad\qquad\qquad R_{i}:=any\;cancidate\;key\;for\;R;$
>$\qquad\qquad\qquad\qquad$end
>$\qquad\qquad\qquad return(R_{1},R_{2},\dots,R_{n})$

1. 求F的最小函数依赖集$F_{c}$
2. 对于$F_{c}$的每个函数依赖关系，如果没有任何一个已经得到的关系模式包含$\alpha \beta$，则将其作为一个关系模式输出

![[07 Chapter7 Relational Database DesignSchema Normalization 3NF分解例题.png]]
Above algorithm ensures:
- each relation schema $R_{i}$ is in 3NF
- decomposition is dependency preserving
- decomposition is lossless-join

## BCNF Decomposition Algorithm

>[!code]
>result:={R}
>done:=false
>compute $F^+$
>while (not done) do
>$\qquad$if (there is a schema $R_{i}$ in result that is not in BCNF)
>$\qquad\qquad$then begin
>$\qquad\qquad\qquad$let $\alpha \to \beta$ be a notrivial functional 
>$\qquad\qquad\qquad$dependency that holds on $R_{i}$, such that $\alpha dot \to R_{i}$ is not in $F^+$,
>$\qquad\qquad\qquad$and $\alpha \cap \beta = \emptyset$;
>$\qquad\qquad\qquad$*result*:={(*result* - $R_{i}$)$\cup$($R_{i}-\beta$)}$\cup${($\alpha,\beta$)};
>$\qquad\qquad$end
>$\qquad$else done:=true;

![[07 Chapter7 Relational Database DesignSchema Normalization BCNF分解.png]]


没有一个通用的方法去实现函数依赖保持，只有无损连接

但是针对特定的，可以考虑去实现





