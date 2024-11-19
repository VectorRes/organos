import { Cliente } from "src/cliente/entities/cliente.entity";
import { Garantia } from "src/garantia/entities/garantia.entity";
import { Proveedor } from "src/proveedor/entities/proveedor.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrganosDisponible {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:false})
    procedencia: string;

    @Column({nullable:false})
    tipoOrgano: string;

    @Column({nullable: false})
    precio: string;

    @ManyToOne(() => Proveedor, proveedor => proveedor.organosDisponibles)
    @JoinColumn({ name: 'id_proveedor' })
    proveedor: Proveedor;

    @OneToOne(() => Garantia, garantia => garantia.organoDisponible) 
    @JoinColumn({name: 'garantia_id'})
    garantia: Garantia

    @ManyToOne(() => Cliente, cliente => cliente.organos)
    @JoinColumn({name: 'cliente_id'})
    cliente: Cliente;

}
