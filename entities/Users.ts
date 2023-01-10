import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("user_email_u", ["userEmail"], { unique: true })
@Index("user_id_pk", ["userId"], { unique: true })
@Index("username_u", ["username"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "integer", name: "user_id" })
  userId: number;

  @Column("character varying", { name: "username", unique: true, length: 60 })
  username: string;

  @Column("text", { name: "password" })
  password: string;

  @Column("character varying", { name: "user_firstname", length: 150 })
  userFirstname: string;

  @Column("character varying", {
    name: "user_middlename",
    nullable: true,
    length: 150,
  })
  userMiddlename: string | null;

  @Column("character varying", {
    name: "user_lastname",
    nullable: true,
    length: 150,
  })
  userLastname: string | null;

  @Column("text", { name: "user_email", unique: true })
  userEmail: string;
}
