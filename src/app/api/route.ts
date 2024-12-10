import { NextRequest, NextResponse } from "next/server";

export const GET = async()=>
{
    const label = 'MEHAN Pay';
  const icon = 'https://avatars.githubusercontent.com/u/115608700?s=400&u=bf831a92813772fb388568f5227f3dc68debead7&v=4';

 return NextResponse.json({
      label,
      icon,
  });
}