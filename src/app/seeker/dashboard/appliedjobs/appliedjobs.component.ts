import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobactivityService } from 'src/app/service/jobactivity.service';
import { LoginService } from 'src/app/service/login.service';
import { SearchJobService } from 'src/app/service/search-job.service';
import { AppliedJob } from '../../job-search/appliedJob';
import { Job } from '../../job-search/job';

@Component({
  selector: 'app-appliedjobs',
  templateUrl: './appliedjobs.component.html',
  styleUrls: ['./appliedjobs.component.css']
})
export class AppliedjobsComponent implements OnInit {

  // id:number|string|null=0;
  // job:Job|undefined= new Job();
  jobApplied:AppliedJob[]=[];
  email:string =''
  eMessage:string = ''
  constructor(private jsActivity:JobactivityService,private route:ActivatedRoute, private router:Router,private joblist:SearchJobService,private logins:LoginService) { }

  ngOnInit(): void {
    this.email = sessionStorage.getItem('semail')!
    if(this.email!=null){
      this.fetchAppliedJobs()
    }
    else{
      this.eMessage = "you are logged out Kindly login!!!"
    }

    // this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    // this.jobApplied = Jobs.filter((japplied)=>japplied.id==this.id);
    // console.log(this.jobApplied);
    
    
  }

  fetchAppliedJobs(){
    this.joblist.getAppliedJobsByid(this.email).subscribe((data)=>{
      this.jobApplied=data
      console.log(this.jobApplied);
    },(error)=>{
      console.log(error)
    });
  }

  cancle(id:number){
    if(confirm("Are You sure want to cancle registration for this jobPost"))
      this.jsActivity.deleteJobActivity(id).subscribe((response)=>{
        alert("Successfully Cancled you registration!!!")
        this.fetchAppliedJobs()
        console.log(response);
      },(error)=>{
        console.log(error);
        
      })
  }

}
