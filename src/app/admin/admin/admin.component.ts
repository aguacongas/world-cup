import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  links = [
    {
      path: '/world-cup/admin/match',
      label: 'Match'
    },
    {
      path: '/world-cup/admin/team',
      label: 'Team'
    }
  ];

  ngOnInit() {
  }
}
