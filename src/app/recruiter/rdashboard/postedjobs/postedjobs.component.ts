import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostedJobsServiceService } from '../../posted-jobs-service.service';
import { Postedjob } from '../postedjob';

@Component({
  selector: 'app-postedjobs',
  templateUrl: './postedjobs.component.html',
  styleUrls: ['./postedjobs.component.css']
})
export class PostedjobsComponent implements OnInit {

  jobs:Postedjob[]|undefined
  errorMessage:string = ''
  constructor(private postService:  PostedJobsServiceService,private router: Router) { }

  viewSeekers(id:number){
    this.router.navigate(['/appliedSeekers',id])
  }

  ngOnInit(): void {
    this.postService.getServerPostedJobs()
    .subscribe( (data)=>{
      this.jobs = data
    },(error)=>{
      this.errorMessage = error
    })
  }
  

}