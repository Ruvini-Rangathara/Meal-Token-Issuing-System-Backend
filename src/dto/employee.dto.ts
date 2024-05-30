import { IsEnum, IsString, Length, IsMobilePhone } from 'class-validator';

export class EmployeeDTO {
  emp_no: number;

  @IsEnum(['Mr', 'Mrs', 'Ms'], { message: 'Title must be either Mr, Mrs, or Ms' })
  title: string;

  @IsString({ message: 'Name must be a string' })
  @Length(1, 100, { message: 'Name must be between 1 and 100 characters' })
  name: string;

  @IsMobilePhone(null)
  mobile: string;

  @IsString({ message: 'Address must be a string' })
  @Length(1, 255, { message: 'Address must be between 1 and 255 characters' })
  address: string;

  @IsString({ message: 'NIC must be a string' })
  @Length(1, 12, { message: 'NIC must be between 1 and 12 characters' })
  nic: string;

  @IsEnum(['ACTIVE', 'INACTIVE'], { message: 'Status must be either ACTIVE or INACTIVE' })
  status: string;

  @IsString({ message: 'Picture must be a url' })
  picture: string;
}
