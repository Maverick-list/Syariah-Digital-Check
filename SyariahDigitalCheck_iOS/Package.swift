// swift-tools-version: 5.9
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "SyariahDigitalCheck",
    defaultLocalization: "id",
    platforms: [
        .iOS(.v16),
        .macOS(.v13)
    ],
    products: [
        .library(
            name: "SyariahDigitalCheck",
            targets: ["SyariahDigitalCheck"]
        ),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "SyariahDigitalCheck",
            dependencies: [],
            path: "Sources/SyariahDigitalCheck"
        ),
    ]
)
