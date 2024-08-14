// Credit remix.run's indie-stack, stem from https://github.com/jenseng/abuse-the-platform/blob/2993a7e846c95ace693ce61626fa072174c8d9c7/app/utils/singleton.ts
// Syntax adapted for glase.
export function singleton<Value>(name: string, valueFactory: () => Value)
{
  const g = global as unknown as { __singletons: Record<string, unknown> };
  g.__singletons       ??= {};
  g.__singletons[name] ??= valueFactory();
  return g.__singletons[name] as Value;
}