import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from 'src/app/image-processing.service';
import { AddPostService } from 'src/app/services/add-post.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostPayload } from '../user/dashboard/post-blog/post-payload';
import mojs from '@mojs/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post!: PostPayload;
  permaLink!: number;
  private readonly wordsPerMinute = 265;
  readingTime!: number;
  numberOfClaps = 0;
  initialNumberOfClaps = this.generateRandomNumber(500, 10000);
  tlDuration = 300;

  @ViewChild('clap') clapElement!: ElementRef;
  clapIcon!: HTMLElement;
  clapCount!: HTMLElement;
  clapTotalCount!: any;
  clapHold: any; // Adjust the type as needed

  constructor(
    private router: ActivatedRoute,
    private postService: AddPostService,
    private imageProcessingService: ImageProcessingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.permaLink = params['id'];
    });

    this.postService
      .getPost(this.permaLink)
      .pipe(map((p) => this.imageProcessingService.CreateImages(p)))
      .subscribe(
        (data: PostPayload) => {
          this.post = data;
          this.readingTime = this.calculateReadingTime(this.post.content);
          console.log(this.post);
        },
        (err: any) => {
          console.log('Failure Response', err);
        }
      );
  }

  ngAfterViewInit(): void {
    // Ensure mojs animations are initialized after view is initialized
    this.initializeMojsAnimations();
  }

  private initializeMojsAnimations(): void {
    const triangleBurst = new mojs.Burst({
      parent: this.clapElement.nativeElement,
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: 'polygon',
        radius: { 6: 0 },
        scale: 1,
        stroke: 'rgba(211, 84, 0, 0.5)',
        strokeWidth: 2,
        angle: 210,
        delay: 30,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
        duration: this.tlDuration,
      },
    });

    const circleBurst = new mojs.Burst({
      parent: this.clapElement.nativeElement,
      radius: { 50: 75 },
      angle: 25,
      duration: this.tlDuration,
      children: {
        shape: 'circle',
        fill: 'rgba(149, 165, 166, 0.5)',
        delay: 30,
        speed: 0.2,
        radius: { 3: 0 },
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    const countAnimation = new mojs.Html({
      el: this.clapCount,
      isShowStart: false,
      isShowEnd: true,
      y: { 0: -30 },
      opacity: { 0: 1 },
      duration: this.tlDuration,
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: this.tlDuration / 2,
    });

    const countTotalAnimation = new mojs.Html({
      el: this.clapTotalCount,
      isShowStart: false,
      isShowEnd: true,
      opacity: { 0: 1 },
      delay: (3 * this.tlDuration) / 2,
      duration: this.tlDuration,
      y: { 0: -3 },
    });

    const scaleButton = new mojs.Html({
      el: this.clapElement.nativeElement,
      duration: this.tlDuration,
      scale: { 1.3: 1 },
      easing: mojs.easing.out,
    });

    const animationTimeline = new mojs.Timeline();
    animationTimeline.add([
      triangleBurst,
      circleBurst,
      countAnimation,
      countTotalAnimation,
      scaleButton,
    ]);

    this.clapElement.nativeElement.addEventListener('click', () => {
      this.repeatClapping(animationTimeline);
    });

    this.clapElement.nativeElement.addEventListener('mousedown', () => {
      this.clapHold = setInterval(() => {
        this.repeatClapping(animationTimeline);
      }, 400);
    });

    this.clapElement.nativeElement.addEventListener('mouseup', () => {
      clearInterval(this.clapHold);
    });
  }

  private repeatClapping(animationTimeline: mojs.Timeline): void {
    this.updateNumberOfClaps();
    animationTimeline.replay();
    this.clapIcon.classList.add('checked');
  }

  private updateNumberOfClaps(): void {
    if (this.numberOfClaps < 50) {
      this.numberOfClaps++;
    }
    this.clapCount.innerHTML = '+' + this.numberOfClaps;
    this.clapTotalCount.innerHTML =
      this.initialNumberOfClaps + this.numberOfClaps;
  }

  private generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  calculateReadingTime(passage: string): number {
    const wordCount = this.countWords(passage);
    const textReadingTimeMinutes = wordCount / this.wordsPerMinute;
    return Math.ceil(textReadingTimeMinutes);
  }

  private countWords(text: string): number {
    const words = text.trim().split(/\s+/);
    return words.length;
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
}
