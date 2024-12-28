---
draft: false
date: 2024-12-28
---

# Database Design

ER模型，数据库的概念结构设计的工具

- Requirements
- Conceptual Schema Design (Chapter 6 & 7)
- Logical schema design(Input ER model, output Logical Model)
- Physical Schema Design
- Implementation
- System Testing
- Delivery & Maintenance

主要是概念设计，逻辑设计和物理结构设计

![[06 Database Design Using the E-R Model data base design graph.png]]

---
# ER model

- entity sets(实体集)
- relationship sets(联系集)
- attributes(属性)

## Entity
An entity is an object that exists and is distinguishable from other objects.

E.g.:specific person, company, event, plant

An entity set is a set of entities of the same type that share the same properties.
E.g.: set of all persons, companies, trees

An entity is represented by a set of attributes

## Attribute
Attribute types:
- **Simple** and **composite** attributes
- **Single-valuesd** and **multivalued** attributes
- Derived attributes(导出属性)

## Relationship Set
A relationship is an association among several entities.

A **relationship set** is a mathematical relation among $n\geq 2$entities, each taken from entity sets.

联系也可能有属性

### Degree of a Relationship Set
定义在同一个实体集内的联系：一元联系
定义在两个实体集之间：二元联系
定义在三个实体集之间：三元联系

### Mapping Cardinality
是实体集之间的对应，而不是属性集

- One-to-one. An **entity** in A is associated with at most one entity in B, and an entity in B is associated with at most one entity in A. (See Figure 6.9a.) • 
- One-to-many. An **entity** in A is associated with any number (zero or more) of enti- ties in B. An entity in B, however, can be associated with at most one entity in A. (See Figure 6.9b.)
- Many-to-one. An **entity** in A is associated with at most one entity in B. An entity in B, however, can be associated with any number (zero or more) of entities in A. (See Figure 6.10a.)
- Many-to-many. An **entity** in A is associated with any number (zero or more) of entities in B, and an entity in B is associated with any number (zero or more) of entities in A. (See Figure 6.10b.)

![[06 Database Design Using the E-R Model Figure 6.9.png]]
![[06 Database Design Using the E-R Model Figure 6.10.png]]

## Weak Entity Set

没有主键的实体集

# E-R Diagrams

![[06 Database Design Using the E-R Model example1.png]]

![[06 Database Design Using the E-R Model example2.png]]
虚线连接表示联系集的属性

Entity sets of a relationship need not be distinct
- Each occurrence of an entity set plays a "role" in the relationship
- The labels "course_id" and "prereq_id" are called roles
![[06 Database Design Using the E-R Model example3.png]]

Mapping diagrams
![[06 Database Design Using the E-R Model example4.png]]

全参与和部分参与
![[06 Database Design Using the E-R Model example5.png]]

instructor 部分参与，student 全参与
有老师不指导学生，但是每个学生都有指导的老师


Notation for Expressing More Complex Constraints

A line may have an associated minimum and maximum cardinality, shown in the form l..h, where l is the minimum and h the maximum cardinality. A minimum value of 1 indicates total participation of the entity set in the relationship set; that is, each entity in the entity set occurs in at least one relationship in that relationship set. A maximum value of 1 indicates that the entity participates in at most one relationship, while a maximum value ∗ indicates no limit.

It is easy to misinterpret the 0.. ∗ on the left edge and think that the relationship advisor is many-to-one from instructor to student —this is exactly the **reverse of the correct interpretation**. If both edges have a maximum value of 1, the relationship is one-to-one. If we had specified a cardinality limit of 1.. ∗ on the left edge, we would be saying that each instructor must advise at least one student.

![[06 Database Design Using the E-R Model example6.png]]
用`0..*`这类值(min,max)去表达一对一、多对多等，以及全参与，部分参与等
- 最小值表示全参与(>=1)和部分参与(0)
- 最大值表示这个实体集最多多少次出现在联系集中，可以表示一对一(1:1)、一对多(1:\*)、多对多等

![[06 Database Design Using the E-R Model example7.png]]
`{ phone_number }`表示多值属性
`age()`表示导出属性

弱实体集
![[06 Database Design Using the E-R Model example8.png]]

虚线表示部分键


E.g.
![[06 Database Design Using the E-R Model example9.png]]

先定义出实体集，再定义出联系集，再定义出有什么属性，属性的类型是什么样子的

