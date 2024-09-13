import React, { useEffect, useState } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
`;

const HolidayCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 10px 0;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    background-color: #f1f1f1;
  }
`;

const Icon = styled.div`
  margin-right: 15px;
  color: #007BFF;
  font-size: 24px;
`;

const HolidayInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const HolidayTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const HolidayDate = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const HebrewDate = styled.p`
  font-size: 14px;
  color: #444;
  margin: 0;
  font-style: italic;
`;

const Loading = styled.p`
  text-align: center;
  font-size: 18px;
  color: #007BFF;
`;

const Error = styled.p`
  color: red;
  text-align: center;
  font-size: 18px;
`;

const Khagim = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLocation(position.coords);
          },
          error => {
            console.error('Error getting location:', error);
            setError('Error getting location');
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (!location) return;

    const loadHolidays = async () => {
      try {
        const response = await fetch(
          `https://www.hebcal.com/hebcal/?v=1&cfg=json&year=now&maj=on&min=on&lat=${location.latitude}&lon=${location.longitude}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data); 
        if (data && data.items && data.items.length > 0) {
          const upcomingHolidays = data.items
            .filter(holiday => new Date(holiday.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);
          setHolidays(upcomingHolidays);
        } else {
          setError('No holiday data found');
        }
      } catch (error) {
        console.error('Error fetching holidays:', error);
        setError('Error fetching holidays');
      } finally {
        setLoading(false);
      }
    };

    loadHolidays();
  }, [location]);

  if (loading) return <Loading>Loading holidays...</Loading>;
  if (error) return <Error>{error}</Error>;

  return (
    <Container>
      <h2>Khagim Ahunglhung ding</h2>
      {holidays.length > 0 ? (
        holidays.map((holiday, index) => (
          <HolidayCard key={index}>
            <Icon><FaRegCalendarAlt /></Icon>
            <HolidayInfo>
              <HolidayTitle>{holiday.title}</HolidayTitle>
              <HolidayDate>{holiday.date}</HolidayDate>
              {holiday.hebrew && (
                <HebrewDate>
                  <p>{holiday.hebrew}</p> 
                  <p>{holiday.hdate}</p> 
                </HebrewDate>
              )}
            </HolidayInfo>
          </HolidayCard>
        ))
      ) : (
        <p>No upcoming holidays</p>
      )}
    </Container>
  );
};

export default Khagim;
