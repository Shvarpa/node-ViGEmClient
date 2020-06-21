{
	"targets": [
		{
			"target_name": "vigemclient",
			"sources": [
				"native/src/target.cpp",
				"native/src/target_x360.cpp",
				"native/src/target_ds4.cpp",
				"native/src/vigemclient.cpp"
			],
			"include_dirs": [
				"<(module_root_dir)/include",
				"<!@(node -p \"require('node-addon-api').include\")"
			],
			"dependencies": [
				"<!(node -p \"require('node-addon-api').gyp\")"
			],
			"libraries": [
				"<(module_root_dir)/native/static/<(target_arch)/ViGEmClient.lib"
			],
			"copies": [
				{
					"destination": "<(module_root_dir)/build/Release/",
					"files": [ "<(module_root_dir)/native/static/<(target_arch)/ViGEmClient.dll" ]
				}
			],
			"defines": [
				"NAPI_DISABLE_CPP_EXCEPTIONS"
			]
		}
	]
}