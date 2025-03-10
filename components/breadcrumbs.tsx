import React from 'react';

import { SidebarTrigger } from './ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Separator } from './ui/separator';

export default function Breadcrumbs({ items }: { items: { text: string; href: string }[] }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <SidebarTrigger />
      <div className="flex items-center gap-2 px-4">
        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  {index === items.length - 1 ? (
                    <BreadcrumbPage>{item.text}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>{item.text}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index !== items.length - 1 && <BreadcrumbSeparator className="hidden md:block" />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
