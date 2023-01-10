import { Column, Entity, Index, OneToMany } from "typeorm";
import { Countries } from "./Countries";

@Index("pk_region_id", ["regionId"], { unique: true })
@Entity("regions", { schema: "public" })
export class Regions {
  @Column("integer", { primary: true, name: "region_id" })
  regionId: number;

  @Column("character varying", {
    name: "region_name",
    nullable: true,
    length: 25,
    default: () => "NULL::character varying",
  })
  regionName: string | null;

  @OneToMany(() => Countries, (countries) => countries.region)
  countries: Countries[];
}
