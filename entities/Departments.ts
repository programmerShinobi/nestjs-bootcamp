import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Locations } from "./Locations";
import { Employees } from "./Employees";
import { JobHistory } from "./JobHistory";

@Index("pk_department_id", ["departmentId"], { unique: true })
@Entity("departments", { schema: "public" })
export class Departments {
  @Column("integer", { primary: true, name: "department_id" })
  departmentId: number;

  @Column("character varying", {
    name: "department_name",
    nullable: true,
    length: 30,
  })
  departmentName: string | null;

  @Column("integer", { name: "manager_id", nullable: true })
  managerId: number | null;

  @ManyToOne(() => Locations, (locations) => locations.departments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "location_id", referencedColumnName: "locationId" }])
  location: Locations;

  @OneToMany(() => Employees, (employees) => employees.department)
  employees: Employees[];

  @OneToMany(() => JobHistory, (jobHistory) => jobHistory.department)
  jobHistories: JobHistory[];
}
