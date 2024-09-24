import {ReactNode, useMemo} from 'react';
import {Helmet} from 'react-helmet-async';
import {APP_NAME} from 'constants/app';

interface PageProps {
  name: string,
  displayName?: string,
  description: string,
  className?: string,
  children: ReactNode
}

export default function Page({name, displayName, description, className, children}: PageProps) {
  const pageClass = useMemo(() => className ?? name.toLowerCase().replaceAll(' ', '-'), [className, name])
  const title = displayName === "" ? APP_NAME : `${displayName ?? name} - ${APP_NAME}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className={pageClass}>{children}</div>
    </>
  )
}
