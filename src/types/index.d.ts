import * as THREE from 'three';

export type TCommonProps = {
  title?: string;
  name?: string;
  icon?: string;
};

export type TExperience = {
  companyName: string;
  iconBg: string;
  date: string;
  points: string[];
  link:string;
} & Required<Omit<TCommonProps, "name">>;



export type TProject = {
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  url: string;
} & Required<Pick<TCommonProps, "name">>;

export type TTechnology = Required<Omit<TCommonProps, "title">>;

interface TNavLink {
  id: string;
  title: string;
  className?: string;
  subtitle?: {
    name: string;
    className: string;
    href: string;
  }[];
}

export type TService = Required<Omit<TCommonProps, "name">>;

export type TMotion = {
  direction: "up" | "down" | "left" | "right" | "";
  type: "tween" | "spring" | "just" | "";
  delay: number;
  duration: number;
};
