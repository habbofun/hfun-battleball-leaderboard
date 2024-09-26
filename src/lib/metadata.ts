export function generateMetadata({
  title = 'hfun.info',
  description = 'Habbo Origins: ES Fansite',
}: {
  title?: string;
  description?: string;
}) {
  return {
    title,
    description: 'Habbo Origins: ES Fansite | ' + description,
  };
}
