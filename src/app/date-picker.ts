import { Component, ChangeDetectionStrategy, signal, computed, ElementRef, inject, HostListener, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}

@Component({
  selector: 'app-date-picker',
  imports: [MatIconModule, NgClass],
  templateUrl: './date-picker.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker {
  private elementRef = inject(ElementRef);
  
  selectedDate = signal<Date | null>(null);
  viewDate = signal<Date>(new Date());
  isOpen = signal<boolean>(false);

  dateSelected = output<Date>();

  weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  currentMonthName = computed(() => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(this.viewDate());
  });

  calendarDays = computed(() => {
    const view = this.viewDate();
    const selected = this.selectedDate();
    const today = new Date();
    
    const year = view.getFullYear();
    const month = view.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const days: CalendarDay[] = [];
    
    const firstDayOfWeek = firstDayOfMonth.getDay();
    for (let i = firstDayOfWeek; i > 0; i--) {
      const date = new Date(year, month, 1 - i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: this.isSameDay(date, today),
        isSelected: selected ? this.isSameDay(date, selected) : false,
      });
    }
    
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: this.isSameDay(date, today),
        isSelected: selected ? this.isSameDay(date, selected) : false,
      });
    }
    
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const date = new Date(year, month + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        isToday: this.isSameDay(date, today),
        isSelected: selected ? this.isSameDay(date, selected) : false,
      });
    }
    
    return days;
  });

  formattedSelectedDate = computed(() => {
    const date = this.selectedDate();
    return date ? new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date) : '';
  });

  toggleOpen() {
    this.isOpen.update(v => !v);
  }

  nextMonth(event: Event) {
    event.stopPropagation();
    const view = this.viewDate();
    this.viewDate.set(new Date(view.getFullYear(), view.getMonth() + 1, 1));
  }

  prevMonth(event: Event) {
    event.stopPropagation();
    const view = this.viewDate();
    this.viewDate.set(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  }

  selectDate(day: CalendarDay) {
    this.selectedDate.set(day.date);
    this.dateSelected.emit(day.date);
    this.isOpen.set(false);
    this.viewDate.set(new Date(day.date.getFullYear(), day.date.getMonth(), 1));
  }

  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
