# WaterGuardian

WaterGuardian is an initiative focused on improving water quality in rivers and lakes, particularly in regions like Braunschweig. It combines citizen science, IoT sensor technology, and interactive maps to monitor and raise awareness about water pollution caused by heavy metals, microplastics, and other contaminants. The project aims to:

- **Monitor Water Quality**: Using open-source sensors and buoys to collect real-time data on pollutants like heavy metals.
- **Empower Communities**: Involve citizens in collecting water samples and contributing to environmental research.
- **Educate and Inform**: Provide data visualization through an interactive map and organize educational activities to promote environmental awareness.
- **Support Decision-Making**: Generate scientific data to help policymakers and stakeholders improve water quality.

## Getting Started

This project is built with [Next.js](https://nextjs.org), a React framework for production.

### Prerequisites

- Install [Bun](https://bun.sh/docs/installation)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-repo/waterguardian.git
    cd waterguardian
    ```

2. Install dependencies:
    ```bash
    bun install
    ```

3. Set up your `.env` file based on `.env.template`:
    ```bash
    cp .env.template .env
    # Edit .env to include your MapTiler API keys and other environment variables
    ```

### Running the Development Server

To start the development server, run:
```bash
bun dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.