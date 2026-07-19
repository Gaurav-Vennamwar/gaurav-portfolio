import { Component } from '@angular/core';

import { NavbarComponent } from '../../shared/components/navbar/navbar';
import { BackgroundComponent } from '../../shared/components/background/background';
import { HeroComponent } from './components/hero/hero';
import { JourneyComponent } from './components/journey/journey';
import { EngineeringComponent } from './components/engineering/engineering';
import { SkillsComponent } from './components/skills/skills';
import { KnowledgeComponent } from './components/knowledge/knowledge';
import { ContactComponent } from './components/contact/contact';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    BackgroundComponent,
    HeroComponent,
    JourneyComponent,
    EngineeringComponent,
    SkillsComponent,
    KnowledgeComponent,
    ContactComponent
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {}