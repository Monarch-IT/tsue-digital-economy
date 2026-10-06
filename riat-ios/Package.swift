// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "RIATApp",
    platforms: [
        .iOS(.v17)
    ],
    products: [
        .library(
            name: "RIATShared",
            targets: ["RIATShared"]
        )
    ],
    dependencies: [],
    targets: [
        .target(
            name: "RIATShared",
            path: "Shared"
        )
    ]
)
