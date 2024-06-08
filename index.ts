#! /usr/bin/env node
import inquirer from "inquirer";

class Student{
    static idNo= 1000
    id: number;
    name: string;
    courses: string[];
    balance:number;


    constructor(name:string){
        this.id=Student.idNo++;
        this.name=name;
        this.courses=[];
        this.balance=20000
    }


    course_enrollment(course:string){
        this.courses.push(course)
    }


    view_balance(){
     console.log(`Dear ${this.name} your balance is ${this.balance}`);
     
    }

     

    pay_fees(amount:number){
        this.balance -= amount;
        console.log(`${amount} Fees paid successfully  for ${this.name}`);
        
    }


    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }


}


class Student_manager{
    students:Student[]

    constructor(){
        this.students=[];
    }
        
    //method to add a new student
    add_new_student(name:string){
        let student=new Student(name)
        this.students.push(student)
        console.log(`Student ${name} added Sucessfully. Student ID:${student.id}`);
        
    }
    
    //Define a method to enroll students
    enroll_student(student_id: number, course:string){
        let student=this.students.find(oneStudent => oneStudent.id  === student_id)
        if(student){
            student.course_enrollment(course)
            console.log(`${student.name} has enrolled in ${course} course`);
            
        }
    }

     //Method to view student balance
    view_student_balance(student_id:number,){
        let student_balance=this.students.find(oneStudent=>oneStudent.id === student_id)
        if(student_balance){
            student_balance.view_balance()
        }else{
            console.log("please enter a correct student ID");
        }


    }
    
    //Method to Pay fees
   pay_student_fee(student_id:number, amounts:number){
        let student=this.students.find(oneStudent=>oneStudent.id === student_id)
        if(student){
            student.pay_fees(amounts)
        }else{
            console.log("please enter a correct student ID");
        }
   }

   //Method to show student status
   show_student_status(student_id:number){
    let student=this.students.find(oneStudent=>oneStudent.id === student_id)
    if(student){
        student.show_status()
    }
}

}

//Main function to run the program
async function main() {
    
    let student_data=new Student_manager();

    while(true){
       let choice = await inquirer.prompt([
        {
            name:"choice",
            type:"list",
            message:"Select an option",
            choices:[
                "Add student",
                "Enroll student",
                "View Student Balance",
                "Pay fees",
                "Show status",
                "Exit"
            ]
        }
       ]);
       switch(choice.choice){
        case "Add student":
            let name_input = await inquirer.prompt([
                {
                    name:"name",
                    type:"input",
                    message:"Enter a student name"
                }
            ]);
            student_data.add_new_student(name_input.name);
            break;

        case "Enroll student":
            let course_input= await inquirer.prompt([
                {
                  name:"student_id",
                  type:"number",
                  message:"Enter a student ID" 
                },
                {
                    name:"course",
                    type:"input",
                    message:"Enter a course name"
                }
            ]);
            student_data.enroll_student(course_input.student_id,course_input.course);
            break;

            
        case "View Student Balance":
            let balance_input= await inquirer.prompt([
                {
                    name:"student_id",
                    type:"number",
                    message:"please Enter a student ID"
                }
            ]);
            student_data.view_student_balance(balance_input.student_id)
            break;

        case "Pay fees":
            let fees_input = await inquirer.prompt([
                {
                    name:"student_id",
                    type:"number",
                    message:"please enter a student ID"
                },
                {
                    name:"amounts",
                    type:"number",
                    message:"Enter your amount to pay"
                }
            ]);
            student_data.pay_student_fee(fees_input.student_id, fees_input.amounts);
            break;
        
        case "Show status":
            let status_input= await inquirer.prompt([
                {
                   name:"student_id",
                   type:"number",
                   message:"Enter a student ID to See student status"

                }
            ]);
            student_data.show_student_status(status_input.student_id);
            break;


        case "Exit":
            console.log("Exiting---");
            process.exit()
       }
    }
}
main();