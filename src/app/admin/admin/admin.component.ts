import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  links = [
    {
      path: '/admin/match',
      label: 'Match'
    },
    {
      path: '/admin/team',
      label: 'Team'
    }
  ];

  ngOnInit() {
  }
}
