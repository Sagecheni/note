---
draft: false
date: 2024-12-26
---

# Triggers
A trigger is a statement that is executed automatically by the system as a side effect of a modification to the database.

- Specify when a trigger is to be executed. This is broken up into an event that causes the trigger to be checked and a condition that must be satisfied for trigger execution to proceed.
- Specify the actions to be taken when the trigger executes.

- 触发的时间和事件
- 触发时的动作

- Triggering event can be **insert, delete** or **update**.
- Triggers can be activated **before/after** an event

```sql
create trigger setnull-trigger before/after update on r
	referencing new row as nrow
	for each row
		when nrow.phone-number = ''
		set nrow.phone-numbwer = null;
```

空值需要明确地赋予

Instead of executing a separate action for each affected row, a single action can be executed for all rows affected by a single transaction
- Use `for each statement`(语句触发器) instead of `for each row`(行触发器)
- Use `referencing old table` or `referencing new table` to refer to temporary tables containing the afected rows
- Can be more efficient when dealing with SQL statements that update a large number of rows

行触发器：如果modification涉及到n个行，则会触发n次
语句触发器：不管涉及多少行，对update只执行n次，则会触发n次

Values of attributes before and after an update can be referenced
- `referencing old row as`:for deletes and updates
- `referencing new row as`:for inserts and updates

E.g.
```sql
create trigger credits_earned after update of takes on (grade)
referencing new row as nrow
referencing old row as orow
for each row
when nrow.grade <> 'F' and nrow.grade is no null
	and (orow.grade = 'F' or orow.grade is null)
begin atomic
	update student
	set tot_cred = tot_cred +
		(select credits
		 from course
		 where course.course_id = nrow.course_id)
	where student.id = nrow.id;
end;
```


