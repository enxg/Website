<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Social from "~/components/Social.vue";
import { toast } from "~/components/ui/toast";
import type { FormActions } from "vee-validate";
import {
  InstagramLogoIcon,
  DiscordLogoIcon,
  GithubLogoIcon,
  EnvelopeClosedIcon,
} from "@radix-icons/vue";
import { sendEmailSchema } from "~/schemas/sendEmail";

const formSchema = toTypedSchema(sendEmailSchema);

const formActive = ref(false);
const submitActive = ref(true);
const turnstile = ref();

const { $client } = useNuxtApp();

async function onSubmit(
  values: {
    "name": string;
    "email": string;
    "message": string;
    "cf-turnstile-response": string;
  },
  { resetForm }: FormActions<any>,
) {
  submitActive.value = false;
  const { success } = await $client.sendEmail.mutate(values);

  if (success) {
    toast({
      title: "Form submitted!",
      description: "I'll get back to you as soon as possible.",
    });

    formActive.value = false;
    resetForm();
  } else {
    toast({
      title: "Form submission failed!",
      description: "Please try again later.",
    });
  }

  submitActive.value = true;
}

function onInvalidSubmit({ values, errors, results }: any) {
  console.log({ values, errors, results });

  if (Object.values(values)) {
    return toast({
      title: "Invalid form",
      description: "All fields are required.",
    });
  }

  return toast({
    title: "Invalid form",
    description: errors.name
      ? `Name: ${errors.name}`
      : errors.email
        ? `Email: ${errors.email}`
        : errors.message
          ? `Message: ${errors.message}`
          : "Please check the form.",
  });
}
</script>

<template>
  <div class="flex items-center justify-center h-full w-full">
    <div class="flex flex-col md:flex-row items-center gap-40 p-8 rounded-lg">
      <div class="flex flex-col gap-12">
        <span class="font-medium text-8xl">Enes<br />Genç</span>
        <span class="px-2">Student / Full-stack Web Developer</span>
        <div class="flex flex-row gap-4">
          <Social to="https://github.com/enxg" aria-label="GitHub">
            <GithubLogoIcon class="h-8 w-auto" />
          </Social>
          <Social to="https://dc.enesgenc.dev" aria-label="Discord">
            <DiscordLogoIcon class="h-8 w-auto" />
          </Social>
          <Social
            to="https://instagram.com/enesgenc.dev"
            aria-label="Instagram"
          >
            <InstagramLogoIcon class="h-8 w-auto" />
          </Social>
        </div>
      </div>
      <div class="flex flex-col gap-6 items-center">
        <h1 class="font-medium text-3xl">Contact me!</h1>
        <div class="flex flex-row gap-4 items-center">
          <EnvelopeClosedIcon class="w-auto h-5" />
          <span class="pb-0.5 text-lg">hello@enesgenc.dev</span>
        </div>
        <Separator />
        <!-- @vue-ignore -->
        <Form
          :validation-schema="formSchema"
          @invalid-submit="onInvalidSubmit"
          @submit="onSubmit"
          @click="formActive = true"
          class="flex flex-col gap-2"
        >
          <FormField v-slot="{ componentField }" name="name">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Your Name"
                v-bind="componentField"
              />
            </FormControl>
          </FormField>
          <FormField v-slot="{ componentField }" name="email">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Your Email"
                v-bind="componentField"
              />
            </FormControl>
          </FormField>
          <FormField v-slot="{ componentField }" name="message">
            <FormLabel>Message</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Your Message"
                v-bind="componentField"
                class="resize-none"
              />
            </FormControl>
          </FormField>
          <FormField
            v-if="formActive"
            v-slot="{ componentField }"
            name="cf-turnstile-response"
          >
            <NuxtTurnstile
              v-bind="componentField"
              data-appearence="interaction-only"
              ref="turnstile"
            />
          </FormField>
          <Button class="font-medium mt-2" type="submit" :disabled="!submitActive">Send</Button>
        </Form>
      </div>
    </div>
    <Toaster />
  </div>
</template>

<style scoped></style>
