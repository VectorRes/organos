import { OrganosDisponible } from "src/organos-disponibles/entities/organos-disponible.entity";
import { Column, OneToOne, PrimaryGeneratedColumn, JoinColumn, Entity} from "typeorm";

@Entity()
export class Garantia {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    descripcion: string;

    @Column()
    periodoDeValidez: number;

    @OneToOne(() => OrganosDisponible, organoDisponible => organoDisponible.garantia) 
    organoDisponible: OrganosDisponible

}
