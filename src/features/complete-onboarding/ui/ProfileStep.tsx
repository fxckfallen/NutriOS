import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { OnboardingAnswers } from '../model/types';
import { Input, SelectItem } from '@/shared/ui';

interface ProfileStepProps {
    onNext: (name: OnboardingAnswers['name'], sex: OnboardingAnswers['sex'], age: OnboardingAnswers['age']) => void;
}   

export const ProfileStep: React.FC<ProfileStepProps> = ({ onNext  }) => {
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState(18);
  return (
    <View>
        <View>
            <Text className="text-disp font-bold text-foreground">What's your name?</Text>
            <Input placeholder='Write here...'/>
        </View>
        <View>
            <Text className="text-disp font-bold text-foreground">What's your sex?</Text>
            <View className=''>
                <SelectItem onSelect={setSex} mainText='Male' selected={sex === "male"} value='male'/>
                <SelectItem onSelect={setSex} mainText='Female' selected={sex === "female"} value='female'/>
            </View>
        </View>        
        <View>
            <Text className="text-disp font-bold text-foreground">What's your age?</Text>
        </View>
    </View>
  );
};

export default ProfileStep;