import { BinaryPolicyholderModel } from '../../models/binary-policyholder.model';

export class FindPolicyholderRo {
  constructor(
    main: BinaryPolicyholderModel,
    leftTree: BinaryPolicyholderModel[],
    rightTree: BinaryPolicyholderModel[],
  ) {
    this.code = main.code.toString();
    this.name = main.name;
    this.registration_date = main.registration_date;
    this.introducer_code = main.introducer_code
      ? main.introducer_code.toString()
      : null;
    this.l = leftTree.map((result) => new PolicyholderRo(result));
    this.r = rightTree.map((result) => new PolicyholderRo(result));
  }

  code: string;

  name: string;

  registration_date: Date;

  introducer_code: string;

  l: PolicyholderRo[];

  r: PolicyholderRo[];
}

class PolicyholderRo {
  constructor(data: BinaryPolicyholderModel) {
    this.code = data.code.toString();
    this.name = data.name;
    this.registration_date = data.registration_date;
    this.introducer_code = data.introducer_code
      ? data.introducer_code.toString()
      : null;
  }

  code: string;

  name: string;

  registration_date: Date;

  introducer_code: string;
}
