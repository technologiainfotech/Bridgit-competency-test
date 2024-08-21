<!-- eslint-disable no-case-declarations -->
<!-- eslint-disable no-console -->
<script setup lang="ts">
import { api } from '@/api';
import { computed, ref } from 'vue';
import { useModal } from '@/composables/useModal';
import { useToast } from '@/composables/useToast';
const modal = useModal<boolean>();
const toast = useToast();

const props = defineProps<{
  loadApplications: () => Promise<void>;
}>();

const formData = ref({
  applicantName: '',
  applicantEmail: '',
  applicantMobilePhoneNumber: '',
  applicantAddress: '',
  annualIncomeBeforeTax: 0,
  incomingAddress: '',
  incomingDeposit: 0,
  incomingPrice: 0,
  incomingStampDuty: 0,
  loanAmount: 0,
  loanDuration: 0,
  monthlyExpenses: 0,
  outgoingAddress: '',
  outgoingMortgage: 0,
  outgoingValuation: 0,
  savingsContribution: 0,
});

const errors = ref({
  applicantName: '',
  applicantEmail: '',
  applicantMobilePhoneNumber: '',
  applicantAddress: '',
  annualIncomeBeforeTax: 0,
  incomingAddress: '',
  incomingDeposit: 0,
  incomingPrice: 0,
  incomingStampDuty: 0,
  loanAmount: 0,
  loanDuration: 0,
  monthlyExpenses: 0,
  outgoingAddress: '',
  outgoingMortgage: 0,
  outgoingValuation: 0,
  savingsContribution: 0,
});

const isFormInvalid = computed(() => {
  return Object.values(errors.value).some((error) => error !== '');
});

const validateField = (field) => {
  switch (field) {
    case 'applicantName':
      errors.value.applicantName = formData.value.applicantName ? '' : 'Name is required.';
      break;
    case 'applicantEmail':
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.value.applicantEmail = emailPattern.test(formData.value.applicantEmail) ? '' : 'Invalid email address.';
      break;
    case 'applicantMobilePhoneNumber':
      const phonePattern = /^[0-9]{10}$/;
      errors.value.applicantMobilePhoneNumber = phonePattern.test(formData.value.applicantMobilePhoneNumber)
        ? ''
        : 'Enter a valid 10-digit phone number.';
      break;
    case 'loanAmount':
      errors.value.loanAmount =
        formData.value.loanAmount > formData.value.incomingPrice * 0.8
          ? 'Loan amount exceeds 80% of the incoming price.'
          : '';
      break;
    case 'loanDuration':
      errors.value.loanDuration = formData.value.loanDuration >= 12 ? '' : 'Loan duration must be at least 12 months.';
      break;
    case 'annualIncomeBeforeTax':
      errors.value.annualIncomeBeforeTax =
        formData.value.annualIncomeBeforeTax > 0 ? '' : 'Annual income must be greater than zero.';
      break;
    case 'incomingDeposit':
      errors.value.incomingDeposit =
        formData.value.incomingDeposit >= 0 ? '' : 'Incoming deposit must be non-negative.';
      break;
    case 'incomingPrice':
      errors.value.incomingPrice = formData.value.incomingPrice >= 0 ? '' : 'Incoming price must be non-negative.';
      break;
    case 'incomingStampDuty':
      errors.value.incomingStampDuty =
        formData.value.incomingStampDuty >= 0 ? '' : 'Incoming stamp duty must be non-negative.';
      break;
    case 'monthlyExpenses':
      errors.value.monthlyExpenses =
        formData.value.monthlyExpenses >= 0 ? '' : 'Monthly expenses must be non-negative.';
      break;
    case 'outgoingMortgage':
      errors.value.outgoingMortgage =
        formData.value.outgoingMortgage >= 0 ? '' : 'Outgoing mortgage must be non-negative.';
      break;
    case 'outgoingValuation':
      errors.value.outgoingValuation =
        formData.value.outgoingValuation >= 0 ? '' : 'Outgoing valuation must be non-negative.';
      break;
    case 'savingsContribution':
      errors.value.savingsContribution =
        formData.value.savingsContribution >= 0 ? '' : 'Savings contribution must be non-negative.';
      break;
    case 'applicantAddress':
    case 'incomingAddress':
    case 'outgoingAddress':
      errors.value[field] = formData.value[field] ? '' : 'This field is required.';
      break;
    default:
      break;
  }
};

const submitApplication = async () => {
  console.log('calle', isFormInvalid.value);
  if (isFormInvalid.value) {
    toast.warning('All fields are required!');
    return;
  }
  const response = await api.applications.post(formData.value);
  if (response.success) {
    toast.success(response?.message);
    await props.loadApplications();
  } else {
    toast.error('Error occurred while saving application');
  }
  formData.value.applicantName = '';
  formData.value.applicantEmail = '';
  formData.value.applicantMobilePhoneNumber = '';
  formData.value.applicantAddress = '';
  formData.value.annualIncomeBeforeTax = 0;
  formData.value.incomingAddress = '';
  formData.value.incomingDeposit = 0;
  formData.value.incomingPrice = 0;
  formData.value.incomingStampDuty = 0;
  formData.value.loanAmount = 0;
  formData.value.loanDuration = 0;
  formData.value.monthlyExpenses = 0;
  formData.value.outgoingAddress = '';
  formData.value.outgoingMortgage = 0;
  formData.value.outgoingValuation = 0;
  formData.value.savingsContribution = 0;
  modal.confirm(false);
};
</script>

<template>
  <div class="action-section">
    <BCard align-title="center" align-footer="center" align-content="center">
      <template #title>Submit loan application</template>
      <BSvgIcon name="dashboard-loan" />
      <template #footer>
        <BButton
          variant="primary"
          label="Submit application"
          icon-pos="right"
          icon="pi pi-chevron-right"
          @click="modal.showModal()"
        />
      </template>
    </BCard>

    <BModal :visible="modal.isVisible.value" :confirm="modal.confirm">
      <template #header>Submit loan application</template>

      <form @submit.prevent="submitApplication">
        <!-- Name -->
        <label for="applicant_name">Name</label>
        <BTextInput
          id="applicant_name"
          v-model="formData.applicantName"
          type="text"
          required
          @blur="validateField('applicantName')"
        />
        <span v-if="errors.applicantName" class="error">{{ errors.applicantName }}</span>

        <!-- Email -->
        <label for="applicant_email">Email</label>
        <BTextInput
          id="applicant_email"
          v-model="formData.applicantEmail"
          type="email"
          required
          @blur="validateField('applicantEmail')"
        />
        <span v-if="errors.applicantEmail" class="error">{{ errors.applicantEmail }}</span>

        <!-- Mobile Phone Number -->
        <label for="applicant_mobile_phone_number">Mobile Phone Number</label>
        <BTextInput
          id="applicant_mobile_phone_number"
          v-model="formData.applicantMobilePhoneNumber"
          type="tel"
          pattern="[0-9]{10}"
          required
          @blur="validateField('applicantMobilePhoneNumber')"
        />
        <span v-if="errors.applicantMobilePhoneNumber" class="error">{{ errors.applicantMobilePhoneNumber }}</span>

        <!-- Applicant Address -->
        <label for="applicant_address">Applicant Address</label>
        <BTextInput
          id="applicant_address"
          v-model="formData.applicantAddress"
          required
          @blur="validateField('applicantAddress')"
        />
        <span v-if="errors.applicantAddress" class="error">{{ errors.applicantAddress }}</span>

        <!-- Annual Income Before Tax -->
        <label for="annual_income_before_tax">Annual Income Before Tax</label>
        <BNumberInput
          id="annual_income_before_tax"
          v-model="formData.annualIncomeBeforeTax"
          :min="0"
          required
          @blur="validateField('annualIncomeBeforeTax')"
        />
        <span v-if="errors.annualIncomeBeforeTax" class="error">{{ errors.annualIncomeBeforeTax }}</span>

        <!-- Incoming Address -->
        <label for="incoming_address">Incoming Address</label>
        <BTextInput
          id="incoming_address"
          v-model="formData.incomingAddress"
          required
          @blur="validateField('incomingAddress')"
        />
        <span v-if="errors.incomingAddress" class="error">{{ errors.incomingAddress }}</span>

        <!-- Incoming Deposit -->
        <label for="incoming_deposit">Incoming Deposit</label>
        <BNumberInput
          id="incoming_deposit"
          v-model="formData.incomingDeposit"
          :min="0"
          required
          @blur="validateField('incomingDeposit')"
        />
        <span v-if="errors.incomingDeposit" class="error">{{ errors.incomingDeposit }}</span>

        <!-- Incoming Price -->
        <label for="incoming_price">Incoming Price</label>
        <BNumberInput
          id="incoming_price"
          v-model="formData.incomingPrice"
          :min="0"
          required
          @blur="validateField('incomingPrice')"
        />
        <span v-if="errors.incomingPrice" class="error">{{ errors.incomingPrice }}</span>

        <!-- Incoming Stamp Duty -->
        <label for="incoming_stamp_duty">Incoming Stamp Duty</label>
        <BNumberInput
          id="incoming_stamp_duty"
          v-model="formData.incomingStampDuty"
          :min="0"
          required
          @blur="validateField('incomingStampDuty')"
        />
        <span v-if="errors.incomingStampDuty" class="error">{{ errors.incomingStampDuty }}</span>

        <!-- Loan Amount -->
        <label for="loan_amount">Loan Amount</label>
        <BNumberInput
          id="loan_amount"
          v-model="formData.loanAmount"
          :min="0"
          :max="formData.incomingPrice * 0.8"
          required
          @blur="validateField('loanAmount')"
        />
        <span v-if="errors.loanAmount" class="error">{{ errors.loanAmount }}</span>

        <!-- Loan Duration -->
        <label for="loan_duration">Loan Duration (Months)</label>
        <BNumberInput
          id="loan_duration"
          v-model="formData.loanDuration"
          :min="12"
          :decimal="0"
          required
          @blur="validateField('loanDuration')"
        />
        <span v-if="errors.loanDuration" class="error">{{ errors.loanDuration }}</span>

        <!-- Monthly Expenses -->
        <label for="monthly_expenses">Monthly Expenses</label>
        <BNumberInput
          id="monthly_expenses"
          v-model="formData.monthlyExpenses"
          :min="0"
          required
          @blur="validateField('monthlyExpenses')"
        />
        <span v-if="errors.monthlyExpenses" class="error">{{ errors.monthlyExpenses }}</span>

        <!-- Outgoing Address -->
        <label for="outgoing_address">Outgoing Address</label>
        <BTextInput
          id="outgoing_address"
          v-model="formData.outgoingAddress"
          required
          @blur="validateField('outgoingAddress')"
        />
        <span v-if="errors.outgoingAddress" class="error">{{ errors.outgoingAddress }}</span>

        <!-- Outgoing Mortgage -->
        <label for="outgoing_mortgage">Outgoing Mortgage</label>
        <BNumberInput
          id="outgoing_mortgage"
          v-model="formData.outgoingMortgage"
          :min="0"
          required
          @blur="validateField('outgoingMortgage')"
        />
        <span v-if="errors.outgoingMortgage" class="error">{{ errors.outgoingMortgage }}</span>

        <!-- Outgoing Valuation -->
        <label for="outgoing_valuation">Outgoing Valuation</label>
        <BNumberInput
          id="outgoing_valuation"
          v-model="formData.outgoingValuation"
          :min="0"
          required
          @blur="validateField('outgoingValuation')"
        />
        <span v-if="errors.outgoingValuation" class="error">{{ errors.outgoingValuation }}</span>

        <!-- Savings Contribution -->
        <label for="savings_contribution">Savings Contribution</label>
        <BNumberInput
          id="savings_contribution"
          v-model="formData.savingsContribution"
          :min="0"
          required
          @blur="validateField('savingsContribution')"
        />
        <span v-if="errors.savingsContribution" class="error">{{ errors.savingsContribution }}</span>
      </form>

      <template #footer>
        <BButton variant="primary" label="Submit" @click="submitApplication"></BButton>
        <BButton label="Cancel" @click="modal.confirm(false)"></BButton>
      </template>
    </BModal>
  </div>
</template>

<style lang="scss" scoped>
.action-section {
  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  align-items: stretch;
  container-type: inline-size;

  > * {
    flex: 1 1 100%;
  }

  @container (min-width: 900px) {
    > * {
      flex: 1 1 calc((100% - 2rem) / 3);
    }
  }
}

.b-card {
  height: 100%;
}

.b-icon {
  width: 5rem;
  height: 5rem;
}
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 0.2em;
  display: block;
}
</style>
