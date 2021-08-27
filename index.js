const { query } = require('express');
const express= require('express');
const app= express();
const pool=require("./db")
app.use(express.json());

app.get("/finding/:dept",async(req,res)=>{
    try {
      const{dept}=req.params;
     const todo=await pool.query("SELECT FIRST_NAME,SALARY,DEPARTMENT FROM employee WHERE DEPARTMENT=$1 AND SALARY > 100000",[dept]);
    res.json(todo.rows);
       } catch (err) {
           console.error(err.message)
       }
   })

   app.get("/unique",async(req,res)=>{
    try {
      const{dept}=req.params;
     const uniqueDept=await pool.query("SELECT DISTINCT DEPARTMENT FROM employee ");
    res.json(uniqueDept.rows);
       } catch (err) {
           console.error(err.message)
       }
   })
   
   app.post("/todo",async(req,res)=>{
       try {
           const {emp_id,FIRST_NAME,LAST_NAME,SALARY,JOINING_DATE,DEPARTMENT}=req.body;
           const addEmployeeInfo=await pool.query("INSERT INTO employee (emp_id,FIRST_NAME,LAST_NAME,SALARY,JOINING_DATE,DEPARTMENT) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *"
                                                                ,[emp_id,FIRST_NAME,LAST_NAME,SALARY,JOINING_DATE,DEPARTMENT]);
           res.json(addEmployeeInfo.rows[0]);
       } catch (err) {
           console.error(err.message)
       }
   })
   

app.delete("/delete",async(req,res)=>{
    try {
        
        const deleteEmp=await pool.query("DELETE FROM EMPLOYEE WHERE DEPARTMENT IS NULL");
        res.json(" EMPLOYEE INFORMATION IS DELETED");
    } catch (err) {
        console.error(err.message)
    }
})

app.put("/update/:id",async(req,res)=>{
    try {
    const{id}=req.params;
     const {FIRST_NAME,LAST_NAME,SALARY,DEPARTMENT}=req.body;
     const updateEmployeeInfo=await pool.query("UPDATE employee SET FIRST_NAME=$1,LAST_NAME=$2,SALARY=$3,DEPARTMENT=$4 WHERE emp_id=$5 "
                                                                            ,[FIRST_NAME,LAST_NAME,SALARY,DEPARTMENT,id]);
        res.json(" EMPLOYEE INFORMATION IS UPDATED");
    } catch (err) {
        console.error(err.message)
    }
})





app.listen(3000,()=>{
    console.log('Linstenig for port 3000....')
})