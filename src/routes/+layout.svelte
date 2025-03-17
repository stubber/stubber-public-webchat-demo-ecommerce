<script>
	import '../app.css';
	import Navbar from './Navbar.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { navigateTo } from '$lib/utils/navigation';
	import { page } from '$app/stores';

	//disable prerendering
	export let prerendering = false;

	//need to import the environment variables into the svelte component
	console.log(import.meta.env.VITE_PUBLIC_STUBBER_WEBCHAT_PROFILE_UUID);
	console.log(import.meta.env.VITE_PUBLIC_STUBBER_WEBCHAT_PROFILE_BRANCH);
	let profile_uuid = import.meta.env.VITE_PUBLIC_STUBBER_WEBCHAT_PROFILE_UUID;
	let branch = import.meta.env.VITE_PUBLIC_STUBBER_WEBCHAT_PROFILE_BRANCH;

	//get the profile_uuid and branch from the URL query params
	const urlParams = new URLSearchParams(window.location.search);
	let profile_uuid_url = urlParams.get('profile_uuid');
	let branch_url = urlParams.get('branch');
	//Override the profile_uuid and branch if they are passed in the URL
	if (profile_uuid_url) {
		profile_uuid = profile_uuid_url;
	}
	if (branch_url) {
		branch = branch_url;
	}

	/** @type {import('./$types').LayoutData} */
	export let data;
</script>

<svelte:head>
	<script type="module" src="https://webchat.notifications.stubber.com/v2/client/index.js"></script>
	<script>
		window.navigate = async function (page) {
			await window.navigateToCategory(page);
		};

		//use a CustomEvent to communicate with the webchat, send a stubber_webchat_page_control_event
		function send_page_control_event(passed_data) {
			const event = new CustomEvent('stubber_webchat_page_control_event', {
				detail: {
					data: passed_data
				}
			});
			window.dispatchEvent(event);
			console.log('dispatched event', event);
		}

		//will be called when the server sends a control event
		function handle_server_control_event(event) {
			// is run by webchat
			console.log('received SERVER event', event);

			window.navigate(event.page);
		}

		//will be called before any message is sent to the server
		function handle_page_control(message_obj) {
			const urlParams = new URLSearchParams(window.location.search);
			message_obj.control_event = {
				current_page: urlParams.get('category') || 'TVs'
			};

			return message_obj;
		}
	</script>
</svelte:head>

<div class="min-h-screen bg-gray-100">
	<Navbar />
	<main class="container mx-auto px-4 py-8">
		<slot />
	</main>
	<Toast />
	<stubber-webchat
		{profile_uuid}
		{branch}
		on_server_control_event="handle_server_control_event"
		page_control_hook="handle_page_control"
	/>
</div>
