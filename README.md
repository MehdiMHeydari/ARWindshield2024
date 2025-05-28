# AR Windshield | Fall 2024

## Team Members

Mehdi Heydari, Ajay Parthibha, Amelia Zhang

## Summary

The AR Windshield is a comprehensive web-based platform designed to display real-time vehicle information during competitive events. This system provides critical data visualization for both drivers and team members, enabling informed decision-making during races through an intuitive digital interface.

## System Description

The platform has undergone significant enhancements in Spring 2024, with a complete frontend redesign and expanded functionality. Key features now include:

- Real-time GPS tracking for precise vehicle positioning
- Live temperature monitoring with dynamic visualization
- Comprehensive DAQ connection implementation
- Integrated time tracking system
- Enhanced data visualization components including speedometer, battery status, and thermal monitoring
- Planned integration framework for LiveTiming and Historical dashboards

The system utilizes ReactJS for the frontend, incorporating D3.js for complex visualizations and WebSocket connections for real-time data updates. The interface has been optimized for both clarity and performance, ensuring critical information is readily accessible to drivers and team members.

### Key Components

- **Dynamic Dashboard Interface**: Completely redesigned frontend with improved visual hierarchy and component organization
- **Real-time Location Tracking**: Integrated GPS monitoring system using the Google Maps API
- **Environmental Monitoring**: New temperature tracking and visualization system
- **Data Acquisition Interface**: Fully implemented DAQ connection for reliable sensor data collection
- **Time Management System**: Added precise timing functionality for race management

## How To Use

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the systems in the following order:

a. For AR Windshield:

```bash
cd ARWindshield
node server.js
```

b. For FakeDAQ:

```bash
cd FakeDAQ/server
node server.js
```

c. Then in a new terminal:

```bash
cd ARWindshield
npm start
```

## Application Architecture

### Frontend

The frontend has been completely revamped this semester with a focus on modularity and real-time performance:

- **App.js**: Core application container managing component hierarchy and data flow
- **Maps.js**: Handles GPS tracking and location visualization
- **Temperature.js**: New component for environmental data monitoring
- **Battery.js**: Enhanced battery visualization with D3.js
- **Counter.js**: Manages WebSocket connections and real-time data updates

### Backend

The backend system has been strengthened with:

- Robust WebSocket server implementation for real-time data transmission
- Enhanced data processing capabilities for sensor integration
- Planned connectivity framework for dashboard integration

## Challenges and Solutions

This semester's major challenges included:

1. **GPS Integration**: Implemented precise location tracking while managing battery efficiency
2. **Frontend Redesign**: Complete overhaul while maintaining system stability
3. **DAQ Connection**: Successfully completed full implementation with robust error handling
4. **Real-time Data Management**: Optimized WebSocket connections for improved performance

## Future Work

Upcoming development priorities include:

1. Complete integration with LiveTiming and Historical dashboards
2. Enhanced data visualization options
3. Optimization of GPS tracking battery usage
4. Additional sensor integration capabilities
5. Expanded real-time analysis tools

## Recent Updates (Spring 2024)

- Complete frontend redesign for improved user experience
- Added GPS tracking functionality
- Implemented comprehensive temperature monitoring
- Completed DAQ connection implementation
- Developed integration framework for dashboard systems
- Enhanced real-time data visualization components

## Testing

The system undergoes rigorous testing to ensure reliability:

- Unit testing of individual components
- Integration testing of WebSocket connections
- Performance testing under various data loads
- GPS accuracy verification
- Real-time update latency testing

## Performance Considerations

- Optimized WebSocket connections for minimal latency
- Efficient data processing for real-time updates
- Battery-conscious GPS tracking implementation
- Streamlined component rendering

## Dependencies

- React.js
- D3.js
- WebSocket
- Google Maps API
- Node.js
- Express.js

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Contact

mmh287@cornell.edu for more information
