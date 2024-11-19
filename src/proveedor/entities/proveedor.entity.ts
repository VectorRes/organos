import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrganosDisponible } from 'src/organos-disponibles/entities/organos-disponible.entity';

@Entity()
export class Proveedor {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()
    contacto: string;

    @Column()
    localizacion: string;

    @Column()
    correoElectronico: string;

    @Column()
    contrasena: string;

    @OneToMany(() => OrganosDisponible, organosDisponibles => organosDisponibles.proveedor)
    organosDisponibles: OrganosDisponible[];
}