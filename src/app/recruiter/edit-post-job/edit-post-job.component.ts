import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Employer } from 'src/app/pojo/employer';
import { PostedJobsServiceService } from 'src/app/service/posted-jobs-service.service';
import { Postedjob } from 'src/app/pojo/postedjob';
import { SkillsList } from 'src/app/pojo/skills-list';

@Component({
  selector: 'app-edit-post-job',
  templateUrl: './edit-post-job.component.html',
  styleUrls: ['./edit-post-job.component.css']
})
export class EditPostJobComponent implements OnInit {

  email:string|null = ''
  id:any
  skillsList:any = SkillsList
  dropdownSettings : IDropdownSettings={}

  postJobForm : UntypedFormGroup = new UntypedFormGroup({})
  
  employer:Employer = new Employer()

  postJob:Postedjob = new Postedjob()
  EMessage:string = ''
  SMessage:string=''
  
  constructor(private formBuilder: UntypedFormBuilder ,private route:ActivatedRoute,private postJobSerivce:PostedJobsServiceService,private router : Router) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('email')
    if(this.email){
      this.id = this.route.snapshot.paramMap.get('jobPostId')
      console.log(this.id);
      
      this.postJobSerivce.getJobById(this.id)
      .subscribe((data)=>{
    console.log(this.postJob);
        this.postJob = <Postedjob>data
        console.log(this.postJob);
        
      },(error)=>{
        console.error(error);
      })
      this.dropdownSettings = {
        idField:'id',
        textField: 'skillName',
        allowSearchFilter: true
      };
      this.createPostJobForm()
    }
    else{
      this.EMessage = "You Are Logged Out Kindly Login!!!"
    }
  }
  get postJobs(){
    return this.postJobForm?.controls
  }

  createPostJobForm(){
    this.postJobForm = this.formBuilder.group({
      //login:[],
      // employee:this.formBuilder.group({
      //   login:this.formBuilder.group({
      //     userId:['']
      //   })
      // }),
      jobType:['',Validators.required],
      jobRole:['',Validators.required],
      skills:['',Validators.required],
      vacancies:['',[Validators.required
                    ,Validators.min(0)]],
      salary:['',[Validators.required
                    ,Validators.min(0)]],
      experience:['',Validators.required],
      officeAddress:['',Validators.required],
      postedDate:[''],
      isActive:['']
    })
  }
  edit(){
    console.log(this.postJob);
    this.postJobSerivce.updateJob(this.postJob)
    .subscribe((success)=>{
      console.log(success);
      
     // alert(success)
    },(error)=>{
      console.log(error);
      this.EMessage = error
    })
    this.router.navigate(['../../myJobs'],{relativeTo:this.route})
  }
}
