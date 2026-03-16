import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {
  name = 'Umesh Shahi';
  title = 'Developer & BIT Student';
  location = 'Kathmandu, Nepal';
  profileImage = 'https://umesh-shahi.com.np/static/media/first.087974f059ea6011dda0.jpg';
  // Short friendly intro focused on the site and students (not a CV lead)
  devIntro = `Hi — I'm Umesh. I built this site to help BIT students discover resources, notices, and campus updates more easily. I'm studying the B.IT programme at Amrit Science Campus and I build things that make student life a little easier.`;

  // Show study program succinctly
  program = 'B.IT — Amrit Science Campus';
  expectedGraduation = '2026 (expected)';

  // Site-focused content
  sitePurpose = `This site is a lightweight student portal created for BIT students. It brings together notes, notices, resources, and helpful links in one place so classmates can find what they need quickly.`;

  whyBuild = `I made this because I felt classmates needed a simpler, well-organized spot for academic resources and campus info. Building this taught me a lot about UX, accessibility, and small-scale web performance — and I hope it helps you.`;

  features = [
    'Browse and download resources',
    'View latest notices and pagination for archives',
    'Simple, distraction-free reading and mobile-friendly layout',
  ];

  bio = `Background: Flutter developer and student — I enjoy building useful tools for classmates and learning along the way.`;
  contact = {
    phone: '9868732774',
    email: 'thakuriumesh919@gmail.com',
    github: 'https://github.com/919Umesh',
    twitter: 'https://x.com/UmeshSh56100400',
    resume: 'https://umesh-shahi.com.np/static/media/Umesh.83693393c09bb6926a33.pdf'
  };

  constructor(private meta: Meta) {}

  ngOnInit(): void {
    this.meta.updateTag({ name: 'description', content: `${this.name} — ${this.title} based in ${this.location}.` });
  }
}
