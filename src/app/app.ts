import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {DatePicker} from './date-picker';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [DatePicker, MatIconModule],
  template: `
    <div class="min-h-screen bg-[#f2efea] flex flex-col items-center justify-center p-6 font-serif text-[#3d3d3d]">
      <div class="w-full max-w-md bg-white p-8 sm:p-10 rounded-[40px] shadow-sm flex flex-col items-center text-center">
        
        <div class="w-16 h-16 bg-[#5a5a40] rounded-full flex items-center justify-center mb-6">
          <mat-icon class="text-white !w-8 !h-8 text-[32px] leading-none">event</mat-icon>
        </div>

        <h1 class="text-3xl sm:text-4xl font-light leading-tight mb-3">Pick a Date</h1>
        <p class="text-[#5c5954] opacity-80 mb-10 text-sm sm:text-base leading-relaxed max-w-[280px]">
          Choose a date from the calendar to schedule your upcoming appointment.
        </p>

        <div class="w-full flex justify-center pb-24 sm:pb-32">
          <app-date-picker></app-date-picker>
        </div>

      </div>
    </div>
  `,
})
export class App {}
