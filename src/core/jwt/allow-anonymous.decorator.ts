import { SetMetadata } from '@nestjs/common';

export const ALLOW_ANONYMOUS_META_KEY = 'allowAnonymous';

/**
 * Allow  anonymous action
 */
export const AllowAnonymous = () => SetMetadata(ALLOW_ANONYMOUS_META_KEY, true);
