---
title: 02 Relation Model
draft: false
tags:
  - 数据库系统原理
date: 2024-12-25
---
# Relation Algebra

## Select
Def: selects tuples that satisfy a given predicate.
Notation:$\sigma(r)$
*p* is called the selection predicate
E.g.
![](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/DBT-Review/02%20Relation%20Model%20example%20of%20select.png)
allow comparisons like $=,\neq,>,\geq,<,\leq$
Combine several predicates into a larger predicate by using connectives:
$$
\wedge(and),\vee(or),\neg(not)
$$
E.g.
$$
\sigma_{dept\_name=^"physics^"\; \wedge \; salary\; > \; 90,000}(instructor)
$$

## Project
Def: returns its argument relation, with certain attributes **left out**(被排除在外).
Notation:
$$
\Pi_{A_{1},A_{2},A_{3},\dots,A_{k}}(r)
$$
where $A_{1},A_{2},\dots,A_{k}$ are attribute names and *r* is a relation name.

The result defined as *k* columns by erasing the columns that are not listed.
Duplicate rows removed from result, since relations are sets.(需要去重)
![](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/DBT-Review/02%20Relation%20Model%20example%20of%20project.png)
A generalized version of the operator allows expressions involving attributes to appear in the list L. For example, we could use
$$
\Pi_{ID,name,salary/12}(instructor)
$$

## Cartesian-Product(笛卡尔积)
Cartesian-product operation(denoted by X) allows to **combine** information from two relations.将两个relation拼接在一起
![](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/DBT-Review/02%20Relation%20Model%20example%20of%20cartesian-product.png)
Since instructor ID appears in both relations, we distinguish between these attributes by attaching to the attribute the name of relation from which attribute originally came.
- instructor.ID
- teachers.ID

## Join (连接)
The Cartesian-Product instructor X teaches associates every tuple of instructor with every tuple of teaches.将每一个元组都分别连接
Most of the resulting rows have information about instructors who did NOT teach a particular course. 
but we need is that pertain to instructors and the courses that they taught, so we write
$$
\sigma_{instructor.id = teachers.id}(instructor \times teachers)
$$
only those tuples of "instructor X teachers" that pertain to instructors and the courses that they taught.
![](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/DBT-Review/02%20Relation%20Model%20example%20of%20natural%20join.png)
the picture above is the result

The **join operation** combine **select operation** and **Cartesian-Product** operation into a single operation.

Def:Consider relations r(R) and s(S)
Let $\theta$ be a predicate on attributes in schema R union S.
The join operation $r \bowtie_{\theta} s=\sigma_{\theta}(r \times s)$

Thus,
$$
\sigma_{instructor.id = teachers.id}(instructor \times teachers)
$$
Can equivalently be written as
$$
instructor \bowtie_{Instructor.id=teaches.id}teaches
$$

## Union

The union operation allows us to combine two relations
Notation:$r \;\cup \;s$
- r, s must have same arity(数量)
- The attribute domains must be compatible(相符的)
E.g.
$$
\begin{align}
\Pi_{course\_id}(\sigma_{semester=^"Fall^" \;\wedge \; year=2017}(section)) \;\cup\ \; \\\Pi_{course\_id}(\sigma_{semester=^"Spring^" \;\wedge \; year=2018}(section))
\end{align}
$$
![](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/DBT-Review/02%20Relation%20Model%20example%20of%20Union%20operation.png)
## Set-Intersection Operation
The set-intersection operation allows us to find tuples that are in both input relations.
Notation:$r \cap s$
- r, s have the same arity
- attributes of *r* and *s* are compatible
![](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/DBT-Review/02%20Relation%20Model%20example%20of%20Set-Intersection.png)

# Set Difference Operation
The set-difference operation allows find tuples that are in one relation but are not in another.(差)
Notation:$r - s$
Set difference must be taken between compatible relations.
- *r* and *s* must have the same arity
- attribute domains of *r* and *s* must be compatible.

E.g.
![](https://note-image-1316665129.cos.ap-guangzhou.myqcloud.com/DBT-Review/02%20Relation%20Model%20example%20of%20Set-Difference%20Operation.png)
## Assignment Operation
Notation:$\leftarrow$
Working like assignment in programming language
将得到的结果赋值给一个变量，有点像Go的`:=`

## The Rename Operation
The results of relational-algebra expressions do not have a name.  The  rename operator $\rho$  is provided for a name.

## Equivalent Queries
Query1
$$
\sigma_{dept\_ name=^"Physics^" \wedge salary > 90,000}(instructor)
$$
Query2
$$
\sigma_{dept\_ name=^"Physics^" }(\sigma_{salary > 90,000}(instructor))
$$
The two queries are not identical, however, they are equivalent.
Thus, we need **Query optimizers**.