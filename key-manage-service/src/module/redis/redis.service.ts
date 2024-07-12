import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Redis } from 'ioredis';
import { Subject } from 'rxjs';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly redis: Redis;
  private readonly subjects: Map<string, any> = new Map();

  constructor() {
    this.redis = new Redis('redis://localhost:6379'); // Your Redis connection string here
  }

  onModuleInit() {
    console.log("hello")
    this.redis.on('message', (channel, message) => {
      const subject = this.subjects.get(channel);
      if (subject) {
        subject.next(message);
      }
    });
  }

  onModuleDestroy() {
    this.redis.quit();
  }

  publish(channel: string, message: string): void {
    console.log(">>> from publish")
    this.redis.publish(channel, message);
  }

  subscribe(channel: string): any {
    let subject = this.subjects.get(channel);
    if (!subject) {
      subject = new Subject<string>();
      this.subjects.set(channel, subject);
      this.redis.subscribe(channel);
    }
    return subject;
  }
}
