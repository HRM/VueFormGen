export const defaultComponentCollection = componentCollection([
    { selector: ["object"], component: FormObject },
    {
      selector: [
        "field",
        (plan: FormPlan<"field">) => plan.child.section == "boolean",
      ],
      component: FormFieldBoolean,
    },
    { selector: ["field"], component: FormField },
    { selector: ["enum"], component: FormEnum },
    { selector: ["boolean"], component: FormBoolean },
    { selector: ["string"], component: FormString },
    { selector: ["number"], component: FormNumber },
    { selector: ["array"], component: FormArray },
  ]);