import { Component } from '@angular/core';
import { ScriptService } from '../../services/trigger.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { FetchresultService } from '../../services/fetchresult.service';
@Component({
  selector: 'app-triggerbutton',
  standalone: true,
  templateUrl: './triggerbutton.component.html',
  styleUrl: './triggerbutton.component.scss',
  imports: [NgIf, FormsModule],
})
export class TriggerbuttonComponent {
  patient_id: number = 0;
  num_recommendations: number = 0;
  responseMessage: string = '';
  resultContent: string | null = null;
  constructor(private scriptService: ScriptService, private fetchresultService: FetchresultService) {}


  onTriggerScript(): void {
    
    this.scriptService.triggerScript(this.patient_id, this.num_recommendations).subscribe({
      next: (response: any) => {
        this.responseMessage = response.message;
        console.log('Script triggered:', response);
        
        // Poll for results every second until we get them or hit max retries
        let retryCount = 0;
        const maxRetries = 2; // Maximum 30 seconds of waiting
        const pollInterval = setInterval(() => {
          this.fetchresultService.fetchResult().subscribe({
            next: (response: {content: string}) => {
              if (response.content) {
                this.resultContent = response.content;
                clearInterval(pollInterval);
              }
              retryCount++;
              if (retryCount >= maxRetries) {
                clearInterval(pollInterval);
                this.resultContent = 'Error: Timed out waiting for results.';
              }
            },
            error: (error: Error) => {
              console.error('Error fetching result:', error);
              retryCount++;
              if (retryCount >= maxRetries) {
                clearInterval(pollInterval);
                this.resultContent = 'Error: Could not fetch result file.';
              }
            }
          });
        }, 1000);
      },
      error: (error: any) => {
        console.error('Error triggering script:', error);
        this.responseMessage = 'Error triggering script';
      }
    });
}
}
