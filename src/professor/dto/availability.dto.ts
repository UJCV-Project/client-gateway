import { Type } from 'class-transformer';
import { ValidateNested, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IsInt, Min, Max } from 'class-validator';

export class AvailabilityDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailableSlot)
  slots: AvailableSlot[];
}

export class AvailableSlot {
  @IsInt()
  @Min(0)
  @Max(6)
  dayOfWeek: number;

  @IsInt()
  @Min(0)
  @Max(2359)
  startTime: number;

  @IsInt()
  @Min(0)
  @Max(2359)
  endTime: number;
}
